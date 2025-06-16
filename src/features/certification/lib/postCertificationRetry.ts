import { http } from "@/shared/lib/http";
import { PostCertificationRetryResponse } from "../model/type";

export const postCertificationRetry = async (id: string, openToast: (msg: string) => void) => {
  try {
    const res = await http
      .patch(`api/eco-verifications/my/${id}/request-review`)
      .json<PostCertificationRetryResponse>();
    if (res.code !== 2000) {
      openToast("재검토 요청에 실패했습니다.");
      return;
    }
    openToast("재검토 요청이 완료되었습니다.");
    return res;
  } catch (error) {
    openToast("재검토 요청에 실패했습니다.");
    throw error;
  }
};
