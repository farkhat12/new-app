const isProd = process.env.NODE_ENV === "production";

// Prod: "__Host-" prefiksi cookie di tek usı domenge baylaydı (qáwipsizirek)
// Dev: ápiwayı at, sebebi "__Host-" https talap etedi
export const SID_COOKIE = isProd ? "__Host-sid" : "sid";

export const sidCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
};
