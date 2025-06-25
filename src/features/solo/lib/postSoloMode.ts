import { httpNoThrow } from "@/shared/lib/http";
import { PostSoloModeResponse } from "../model/type";

export const postSoloMode = async () => {
  try {
    const res = await httpNoThrow.post("api/couples/solo").json<PostSoloModeResponse>();
    return res;
  } catch (error) {
    console.error("솔로 모드 시작 요청 실패", error);
    throw new Error("Failed to start solo mode");
  }
};
