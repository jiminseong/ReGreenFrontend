import { httpNoThrow } from "@/shared/lib/http";
interface PostEasterEggResponse {
  code: 2000 | number;
  message: string;
}

interface PostEasterEggError {
  code: 47007 | number;
  message: "Already approved easter egg" | string;
  method: "POST" | string;
  path: "/api/eco-verifications/easter-egg" | string;
  timestamp: "2025-06-10 17:18:42" | string;
}

export const postEasterEgg = async () => {
  const response = await httpNoThrow
    .post(`api/eco-verifications/easter-egg`)
    .json<PostEasterEggResponse | PostEasterEggError>();
  return response;
};
