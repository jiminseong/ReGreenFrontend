// lib/http.ts
import ky from "ky";

export const http = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
  timeout: 10000,
  hooks: {
    beforeRequest: [
      () => {
        // 필요 시 헤더 추가 가능
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 419) {
          // Silent refresh 시도 가능
          const refresh = await ky.post("auth/refresh", {
            prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
            credentials: "include",
          });

          if (!refresh.ok) {
            // 리프레시 실패 시 로그아웃 등 처리
            window.location.href = "/login";
          }

          // 원래 요청 재시도
          return ky(request);
        }

        return response;
      },
    ],
  },
});
