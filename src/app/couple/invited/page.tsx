"use client";
import Button from "@/shared/ui/Button";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { httpNoThrow } from "@/shared/lib/http";

import { useToastStore } from "@/entities/user/model/store";
import { useNickName } from "@/entities/user/lib/useNickName";
import CommonModal from "@/widgets/ComonModal";
import Loading from "@/widgets/Loading";

const CoupleInvitePage = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const data = useMyInfo();
  const [inviteCode, setInviteCode] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const { data: inviteNickName, isSuccess: isNickSuccess } = useNickName({ inviteCode });

  const setIsCoupleJoinedToast = useToastStore((state) => state.setIsCoupleJoinedToast);

  // 커플이라면 초대 코드 발급 누르면 발급 후
  const postInviteCode = async () => {
    if (data.isSuccess) {
      if (data.data.coupleId === null) {
        // 발급 API 호출
        try {
          setLoading(true);
          await httpNoThrow
            .post("api/couples/join", { json: { code: inviteCode } })
            .json<{
              code: number;
              message: string;
              data: { coupleId: string };
            }>()
            .then((res) => {
              if (res.code === 2100) {
                setLoading(false);
                console.log("초대 코드 발급 성공");
                // 초대 코드 페이지로 이동
                setIsCoupleJoinedToast(true);
                router.push(`/home`);
              } else if (res.code === 400) {
                setLoading(false);
                setModalOpen(true);
              } else if (res.code === 409) {
                setLoading(false);
                setModalOpen(true);
              }
              if (res.code === 500) {
                setLoading(false);
                setModalOpen(true);
              }
            });
        } catch (error) {
          // 초대 코드가 유효하지 않은 경우
          console.error("초대 코드 발급 요청 실패", error);
        }
      }
      return;
    }
  };

  useEffect(() => {
    // 로그인 여부 우선 판단
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    if (data.isSuccess) {
      if (data.data.coupleId) {
        // 커플이 이미 존재하는 경우
        router.push("/home");
      } else {
        return;
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5 pt-24">
      {loading && <Loading />}
      {modalOpen && (
        <CommonModal
          isOpen={modalOpen}
          message={
            <div>
              <div className="text-xl text-center w-full font-bold mb-4">
                초대 코드가 유효하지 않아요
              </div>
              <div className="text-center">
                초대 코드를 다시 확인해주세요.
                <br />
                초대 코드는 6자리입니다.
              </div>
            </div>
          }
          onCancel={() => {
            setModalOpen(false);
          }}
          onlyCancel
          cancelText="확인"
        />
      )}
      {/* 로고 및 타이틀 */}
      <h1 className="text-2xl text-center w-full font-bold mb-4">환영합니다!</h1>
      <div className="h-full w-full flex flex-col items-center mt-44 gap-4">
        <div className="font-semibold text-xl">
          {inviteCode.length > 0 && isNickSuccess ? `${inviteNickName}의` : "상대방의"} 초대를 받고
          오셨나요?
        </div>
        <input
          value={inviteCode}
          className="text-lg font-bold w-full text-center rounded-lg bg-[#F6F6F6] py-2.5"
          placeholder="초대 코드를 입력해주세요"
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <div className="text-sm text-[#AFAFAF]">초대 코드는 6자리입니다.</div>
      </div>
      <div className="flex w-full gap-4">
        <Button
          onClick={() => {
            if (isNickSuccess) {
              setInviteCode("");
            } else {
              router.push("/couple");
            }
          }}
          active={false}
        >
          {isNickSuccess ? "아니오" : "취소"}
        </Button>
        <Button
          onClick={() => {
            if (isNickSuccess) {
              postInviteCode();
            } else {
              setInviteCode("");
            }
          }}
        >
          {isNickSuccess ? "맞아요" : "확인"}
        </Button>
      </div>
    </div>
  );
};

export default CoupleInvitePage;
