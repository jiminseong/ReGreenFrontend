// features/auth/api/useMyInfo.ts
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
      const res = await http.get("api/members/my").json<{ code: number; data: MemberInfo }>();
      return res.data;
    },
    retry: false, // 로그인 안 돼 있으면 401이 뜨기 때문에 불필요한 재시도 방지
    refetchOnWindowFocus: false,
  });
}
