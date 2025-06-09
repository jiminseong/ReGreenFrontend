// src/app/api/proxy/image/route.ts

export const runtime = "edge"; // Edge 런타임을 쓰려면, 아니면 제거해도 무방합니다.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");
  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "url 파라미터가 필요합니다." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl);
  } catch {
    return new Response(JSON.stringify({ error: "이미지 fetch 실패" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: `upstream status ${upstream.status}` }), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 원본 이미지의 Content-Type 그대로 내려줍니다.
  const contentType = upstream.headers.get("Content-Type") || "application/octet-stream";

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      // 필요에 따라 캐시 설정
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
