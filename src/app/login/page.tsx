"use client";
import { Suspense } from "react";
import LoginPage from "@/features/auth/ui/LoginPage";
import Loading from "@/widgets/Loading";
import { useSearchParams } from "next/navigation";

export default function Page() {
  // router.push(`/login/${inviteCode}`); 로 접근해옴
  // 로그인 페이지에서 초대 코드가 필요할 경우 사용
  // 예시: invited/[inviteCode]로 접근 시
  // 로그인이 필요시 /login?inviteCode=초대코드 형태로 접근

  // 초대 코드가 없으면 빈 문자열로 설정
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode") || "";

  return (
    <Suspense fallback={<Loading />}>
      <LoginPage inviteCode={inviteCode} />
    </Suspense>
  );
}
