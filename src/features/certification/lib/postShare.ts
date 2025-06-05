import { httpNoThrow } from "@/shared/lib/http";

interface PostShareResponse {
  code: 2000 | number;
  message: string;
}

interface PostShareError {
  code: 47001 | 47002 | 47006 | 47004 | number;
  message: string;
  method: string;
  path: string;
  timestamp: string;
}

export const postShare = async (memberEcoVerificationId: string) => {
  const response = await httpNoThrow
    .post(`api/eco-verifications/my/${memberEcoVerificationId}/link`)
    .json<PostShareResponse | PostShareError>();
  if (response.code === 2000) {
    // 성공 처리
    return response as PostShareResponse;
  } else {
    // 오류 처리
    return response as PostShareError;
  }
};
