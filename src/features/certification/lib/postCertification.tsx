import { http } from "@/shared/lib/http";
import { PostCertificationResponse } from "../model/type";

export const postCertification = async (id: string, formData: FormData) => {
  try {
    const res = await http
      .post(`api/eco-verifications/${id}`, {
        body: formData,
      })
      .json<PostCertificationResponse>();

    return res;
  } catch (error) {
    throw error;
  }
};
