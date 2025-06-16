import { httpNoThrow } from "@/shared/lib/http";
import { CoupleNickNameResponse } from "../model/type";

export const postCoupleNickName = async (name: string): Promise<CoupleNickNameResponse> => {
  const response = await httpNoThrow
    .patch("api/couples/my/name", {
      json: { name },
    })
    .json<CoupleNickNameResponse>();

  if (!response) {
    throw new Error("서버 응답이 없습니다. 잠시 후 다시 시도해주세요.");
  }

  if (response.code === 2000) {
    return response;
  }

  if (response.error?.code === 40000) {
    throw new Error("커플 닉네임은 2자 이상 10자 이하로 설정해주세요.");
  }

  throw new Error(response.error?.message ?? "알 수 없는 오류가 발생했습니다.");
};
