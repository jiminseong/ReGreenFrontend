// app/api/auth/login/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { accessToken, refreshToken } = await req.json();

  const response = NextResponse.json({ message: "로그인 성공" });

  const isProd = process.env.NODE_ENV === "production";

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 60 * 15, // 15분
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14일
  });

  return response;
}
