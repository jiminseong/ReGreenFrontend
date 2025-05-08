import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "코드 없음" }, { status: 400 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao?code=${code}`);
  const result = await res.json();

  if (result.code === 2100) {
    const accessToken = result.data.accessToken;

    const response = NextResponse.redirect(new URL("/", req.url)); // 로그인 성공 시 홈으로
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  }

  return NextResponse.json({ error: "accessToken 받기 실패" }, { status: 401 });
}
