import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {}

export const config = {
  matcher: ["/loginh"],
};
