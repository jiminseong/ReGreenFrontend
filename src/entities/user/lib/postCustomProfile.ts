import { httpNoThrow } from "@/shared/lib/http";
interface PostCustomProfileResponse {
  code: 2000 | number;
  message: string;
  error?: {
    code: number;
    message: string;
    method: string;
    path: string;
    timestamp: string;
  };
}

export const postCustomProfile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await httpNoThrow
    .post(`api/couples/my/image`, { body: formData })
    .json<PostCustomProfileResponse>();
  return response;
};
