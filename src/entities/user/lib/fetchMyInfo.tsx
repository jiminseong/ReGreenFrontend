import { http } from "@/shared/lib/http";
import { MemberInfo } from "../model/type";

export async function fetchMyInfo(): Promise<MemberInfo> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      email: "",
      memberId: "",
      nickname: "",
      profileImageUrl: "",
      coupleId: null,
    };
  }

  const res = await http.get("api/members/my").json<{ code: number; data: MemberInfo }>();
  return res.data;
}
