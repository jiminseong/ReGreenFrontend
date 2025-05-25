import { httpNoThrow } from "@/shared/lib/http";
import { PostCertificationResponse } from "../model/type";

export const postCertification = async (id: string, formData: FormData) => {
  try {
    const res = await httpNoThrow
      .post(`api/eco-verifications/${id}`, {
        body: formData,
      })
      .json<PostCertificationResponse>();

    return res;
  } catch (error) {
    console.error("❌ 인증 사진 업로드 요청 실패", error);
    throw error;
  }
};
