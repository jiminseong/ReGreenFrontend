// lib/http.ts
import ky from "ky";

/**
 * @module http
 * @description
 * 공통 HTTP 클라이언트 인스턴스입니다.
 * - 모든 요청에 `credentials: include`를 포함하여 쿠키 기반 인증을 지원합니다.
 * - 419 응답(AccessToken 만료) 시 자동으로 refresh 요청을 보내고 원래 요청을 재시도합니다.
 * - `ky` 기반으로 사용되며, JSON 응답은 `.json<T>()`으로 파싱합니다.
 *
 * @example
 * import { http } from "@/lib/http";
 *
 * const data = await http.get("api/user/me").json();
 */

export const http = ky.create({
  /**
   * @property {string} prefixUrl
   * 기본 URL prefix로 사용될 환경 변수
   */
  prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,

  /**
   * @property {"include"} credentials
   * 모든 요청에 쿠키 포함 (쿠키 기반 인증 필수일 경우)
   */
  credentials: "include",

  /**
   * @property {number} timeout
   * 요청 타임아웃 (밀리초 단위)
   */
  timeout: 10000,

  /**
   * @property {object} hooks
   * ky의 요청 전후 훅 (Silent Refresh 등 커스텀 처리에 사용)
   */
  hooks: {
    /**
     * @hook beforeRequest
     * 요청 전 호출되는 훅. 필요 시 헤더 추가 등 처리 가능
     */
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }

        const refreshToken = localStorage.getItem("refreshToken");

        // refresh 요청일 때만 x-refresh-token 추가
        if (refreshToken && request.url.includes("api/auth/refresh")) {
          request.headers.set("x-refresh-token", refreshToken);
        }
      },
    ],

    /**
     * @hook afterResponse
     * 응답 후 호출되는 훅. 토큰 만료(41005) 시 Silent Refresh 및 재요청 처리
     *
     * @param request - 원래 요청 객체
     * @param options - 요청 옵션
     * @param response - 서버 응답 객체
     * @returns 재요청 또는 원래 응답 반환
     */
    afterResponse: [
      async (request, options, response) => {
        console.log("afterResponse", response.status);
        if (response.status === 401) {
          // 로컬 스토리지 비우기
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          const refresh = await http.post("api/auth/refresh", {
            prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
            credentials: "include",
          });

          if (!refresh.ok) {
            window.location.href = "/login";
          }

          return http(request.url, {
            ...options,
            method: request.method,
            headers: request.headers,
            body: request.body,
          });
        }

        return response;
      },
    ],
  },
});

export const httpNoThrow = http.extend({
  throwHttpErrors: false,
});
