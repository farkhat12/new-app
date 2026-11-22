import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { parse } from "set-cookie-parser";

const REFRESH_THRESHOLD = 30;
export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";
export const isProduction = process.env.NODE_ENV === "production";

function isRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function forwardSetCookies(response: NextResponse, setCookieHeaders: string[]) {
  for (const cookie of setCookieHeaders) {
    response.headers.append("Set-Cookie", cookie);
  }
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  });
}

function updateRequestCookies(
  request: NextRequest,
  setCookieHeaders: string[],
) {
  const cookieMap = new Map(
    request.cookies.getAll().map(({ name, value }) => [name, value]),
  );

  const parsedCookies = parse(setCookieHeaders);

  for (const cookie of parsedCookies) {
    if (cookie.maxAge === 0 || cookie.expires?.getTime() === 0) {
      cookieMap.delete(cookie.name);
    } else {
      cookieMap.set(cookie.name, cookie.value);
    }
  }

  const headers = new Headers(request.headers);

  const cookieHeader = [...cookieMap.entries()]
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");

  headers.set("cookie", cookieHeader);

  return headers;
}

function isExpired(token?: string): boolean {
  if (!token) return true;

  try {
    const { exp } = decodeJwt(token);

    if (!exp) return true;

    return exp <= Math.floor(Date.now() / 1000) + REFRESH_THRESHOLD;
  } catch {
    return true;
  }
}

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PROTECTED_ROUTES = ["/bookmarks", "/profile", "/apartments"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage = isRoute(pathname, AUTH_ROUTES);
  const isProtectedPage = isRoute(pathname, PROTECTED_ROUTES);

  if (!isAuthPage && !isProtectedPage) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (accessToken && !isExpired(accessToken)) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!refreshToken) {
    if (isAuthPage) {
      return NextResponse.next();
    }

    const response = NextResponse.next();
    clearAuthCookies(response);

    return response;
  }

  try {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}`,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!refreshResponse.ok) {
      throw new Error("Refresh token rejected");
    }

    const setCookieHeaders = refreshResponse.headers.getSetCookie();

    // NestJS жаңа екі cookie-ді де қайтаруы керек.
    const parsedCookies = parse(setCookieHeaders);

    const newAccessToken = parsedCookies.find(
      (cookie) => cookie.name === ACCESS_TOKEN_COOKIE,
    );

    const newRefreshToken = parsedCookies.find(
      (cookie) => cookie.name === REFRESH_TOKEN_COOKIE,
    );

    if (!newAccessToken || !newRefreshToken) {
      throw new Error("Refresh cookies are missing");
    }

    // Server Component осы request ішінде де
    // жаңа cookie-лерді көре алуы үшін.
    const requestHeaders = updateRequestCookies(request, setCookieHeaders);

    const response = isAuthPage
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

    // Жаңа cookie-лер браузерге беріледі.
    forwardSetCookies(response, setCookieHeaders);

    return response;
  } catch (err: any) {}
}
