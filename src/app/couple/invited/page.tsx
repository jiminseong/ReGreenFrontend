"use client";
import Button from "@/shared/ui/Button";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { httpNoThrow } from "@/shared/lib/http";

import { useToastStore } from "@/shared/store/useToastStore";
import { useNickName } from "@/entities/user/lib/useNickName";
import CommonModal from "@/widgets/ComonModal";
import LogoLoading from "@/widgets/LogoLoading";
import { KakaoInAppBanner } from "@/shared/ui/KakaoInAppBanner";

const CoupleInvitePage = () => {
  const params = useSearchParams();

  const [inviteCode, setInviteCode] = React.useState<string>(
    decodeURIComponent(String(params.get("inviteCode") ?? ""))
  );
  const URLDecodedInviteCode = decodeURIComponent(inviteCode as string);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data, refetch, isSuccess } = useMyInfo();
  const [modalOpen, setModalOpen] = React.useState(false);

  const { data: inviteNickName, isSuccess: isNickSuccess } = useNickName({
    inviteCode: String(URLDecodedInviteCode),
  });
  const { openToast } = useToastStore();

  const postInviteCode = async () => {
    if (!inviteCode || inviteCode.length !== 6) {
      openToast("6자리 초대 코드를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const res = await httpNoThrow.post("api/couples/join", { json: { code: inviteCode } }).json<{
        code: number;
        message: string;
        data: { coupleId: string };
      }>();

      if (res.code === 2000) {
        openToast("커플 연결 성공되었습니다!");
        localStorage.removeItem("inviteCode");
        router.push("/home");
        refetch();
      } else {
        setModalOpen(true);
      }
    } catch (e) {
      console.error("초대 코드 실패", e);
      localStorage.removeItem("inviteCode");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSuccess) return;

    if (data?.coupleId) {
      router.push("/home");
    }
    // 커플 없으면 그대로 초대코드 입력화면 유지
  }, [data?.coupleId, isSuccess]);

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] p-5 pt-24">
      <KakaoInAppBanner />
      {loading && <LogoLoading />}
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
          onChange={(e) => setInviteCode(e.target.value)}
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
          gray
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
