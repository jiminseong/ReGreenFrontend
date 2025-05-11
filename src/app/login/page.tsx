"use client";
import { useMyInfo } from "@/features/auth/lib/userMyInfo";
import LoginButton from "@/features/auth/ui/LoginButton";
import CommonModal from "@/widgets/ComonModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { data, isSuccess } = useMyInfo();
  const [modalState, setModalState] = useState<boolean>(false);
  const router = useRouter();

  // 로그인 상태 확인 후 커플 여부에 따라 페이지 이동
  useEffect(() => {
    if (!isSuccess) return;

    if (data.coupleId) {
      // 커플이면 홈으로 이동
      router.push("/home");
    } else {
      // 커플 아니면 모달 열기
      // 모달 상태 전역 또는 로컬에서 관리
      setModalState(true);
    }
  }, [isSuccess, data]);

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5  ">
      {/* 로고 및 타이틀 */}
      <div className="text-center h-[60%] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-ppink">wooimi</h1>
        <p className="text-xl ">우리는 이별을 미루기로 했다.</p>
      </div>

      <div className=" w-full items-center justify-center flex flex-col gap-4">
        {/* 카카오 로그인 버튼 */}
        <LoginButton provider="kakao" />
        {/* 네이버 로그인 버튼 */}
        {/* <LoginButton provider="naver" /> */}
      </div>
      {/* 하단 텍스트 */}
      <button className="underline text-sm text-gray-500 mt-4">로그인에 어려움이 있나요?</button>
      <CommonModal
        isOpen={modalState}
        message={`커플이 아직 아니시네요!\n초대를 받거나\n초대 코드를 발급해주세요`}
        onConfirm={() => router.push("/couple")}
        onlyConfirm={true}
      />
    </div>
  );
};

export default LoginPage;
