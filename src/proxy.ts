import { NextRequest, NextResponse } from "next/server";
import { accessOpts, refreshOpts } from "@/lib/auth-cookies";

export async function proxy(req: NextRequest) {
  if (req.cookies.has("access_token")) return NextResponse.next();

  const toLogin = () => {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("refresh_token");
    return res;
  };

  const refreshToken = req.cookies.get("refresh_token")?.value;
  if (!refreshToken) return toLogin();

  const r = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });
  if (!r.ok) return toLogin();

  const { accessToken, refreshToken: newRefresh } = await r.json();

  // осы сұраудың өзінде server component жаңа токенді көруі үшін
  req.cookies.set("access_token", accessToken);
  req.cookies.set("refresh_token", newRefresh);
  const res = NextResponse.next({ request: { headers: req.headers } });

  // браузерге сақтау үшін
  res.cookies.set("access_token", accessToken, accessOpts);
  res.cookies.set("refresh_token", newRefresh, refreshOpts);
  return res;
}

export const config = {
  matcher: ["/profile/:path*", "/upload/:path*", "/apartments/:path*"],
};
