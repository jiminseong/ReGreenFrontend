import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";

interface MemberInfo {
  email: string;
  memberId: string;
  nickname: string;
  profileImageUrl: string;
  coupleId: string | null;
}

export function useMyInfo() {
  return useQuery<MemberInfo>({
    queryKey: ["myInfo"],
    queryFn: async () => {
      //accessToken이 없을 시에 userInfo를 가져오지 않는다.
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
      //accessToken이 있을 시에 userInfo를 가져온다.
      const res = await http.get("api/members/my").json<{ code: number; data: MemberInfo }>();
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
