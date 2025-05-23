"use client";
import Button from "@/shared/ui/Button";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { httpNoThrow } from "@/shared/lib/http";

import { useToastStore } from "@/entities/user/model/store";
import { useNickName } from "@/entities/user/lib/useNickName";
import CommonModal from "@/widgets/ComonModal";
import Loading from "@/widgets/Loading";

const CoupleInvitePage = () => {
  const { id: inviteCode } = useParams();
  const URLDecodedInviteCode = decodeURIComponent(inviteCode as string);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data, refetch, isSuccess } = useMyInfo();
  const [modalOpen, setModalOpen] = React.useState(false);

  const { data: inviteNickName, isSuccess: isNickSuccess } = useNickName({
    inviteCode: String(URLDecodedInviteCode),
  });

  const setIsCoupleJoinedToast = useToastStore((state) => state.setIsCoupleJoinedToast);

  const postInviteCode = async () => {
    setLoading(true);
    if (isSuccess) {
      if (data?.coupleId === null) {
        // 발급 API 호출
        try {
          await httpNoThrow
            .post("api/couples/join", { json: { code: inviteCode } })
            .json<{
              code: number;
              message: string;
              data: { coupleId: string };
            }>()
            .then((res) => {
              if (res.code === 2000) {
                setLoading(false);
                console.log("초대 코드 발급 성공");
                // 초대 코드 페이지로 이동
                setIsCoupleJoinedToast(true);
                // 커플이 생겼으니 홈으로 이동
                router.push(`/home`);
                // 커플이 생겼으니 홈으로 이동
                refetch();
              } else if (res.code === 42003 || res.code === 42002 || res.code === 42004) {
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
    if (!isSuccess) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }

    if (data?.coupleId) {
      router.replace("/home");
    }
    // 커플 없으면 그대로 초대코드 입력화면 유지
  }, [data?.coupleId, isSuccess]);

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
          {inviteCode && inviteCode.length > 0 && isNickSuccess
            ? `${inviteNickName}의`
            : "상대방의"}{" "}
          초대를 받고 오셨나요?
        </div>
        <input
          value={inviteCode}
          className="text-lg font-bold w-full text-center rounded-lg bg-[#F6F6F6] py-2.5"
        />
        <div className="text-sm text-[#AFAFAF]">초대 코드는 6자리입니다.</div>
      </div>
      <div className="flex w-full gap-4">
        <Button
          onClick={() => {
            if (isNickSuccess) {
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
