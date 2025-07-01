// services/authService.ts
import { httpNoThrow } from "@/shared/lib/http";
import { fetchMyInfo as _fetchMyInfo } from "@/entities/user/lib/fetchMyInfo";
import { fetchCoupleInfo as _fetchCoupleInfo } from "@/entities/user/lib/fetchCoupleInfo";

export interface LoginResponse {
  code: number;
  data: { accessToken: string; refreshToken: string };
  err?: {
    code: number;
    message: string;
  };
  message?: string;
}

// 카카오 로그인
export const loginWithKakao = (code: string) =>
  httpNoThrow
    .post(`api/auth/kakao/login?code=${code}&local=${process.env.NEXT_PUBLIC_LOCAL_BOOLEAN}`)
    .json<LoginResponse>();

// 내 정보 조회 (Silent Refresh 후 자동 재시도)
export const fetchMyInfo = () => _fetchMyInfo();

// 커플 정보 조회
export const fetchCoupleInfo = () => _fetchCoupleInfo();
