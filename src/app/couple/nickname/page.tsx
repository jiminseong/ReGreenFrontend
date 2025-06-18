"use client";

import { checkIsValidNickName } from "@/features/couple-nickname/lib/checkIsValidNickName";
import { postCoupleNickName } from "@/features/couple-nickname/lib/postCoupleNickName";
import NickNameGuard from "@/features/couple-nickname/lib/NickNameGuard";
import { useToastStore } from "@/shared/model/useToastStore";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const NickNamePage = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastStore();
  const [nickName, setNickName] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setIsValid(checkIsValidNickName(nickName));
  }, [nickName]);

  const handleCoupleNickName = async (nickName: string) => {
    if (!isValid) {
      return;
    }
    try {
      const res = await postCoupleNickName(nickName);
      if (res.code === 2000) {
        await queryClient.invalidateQueries({ queryKey: ["coupleInfo"] });
        router.push("/home");
      }
    } catch (error) {
      console.error("Error posting couple nickname:", error);
      openToast("아지트명 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] p-5 pb-8 pt-24">
      <NickNameGuard />
      <div className="flex flex-col w-full gap-6">
        <h1 className="font-bold w-full text-left text-[26px]">아지트명을 정해주세요!</h1>
        <div className="w-full gap-2.5 flex flex-col">
          <Input
            value={nickName}
            placeHolder="아지트명을 입력해주세요"
            active={isValid}
            onChange={(e) => setNickName(e.target.value)}
          />
          {!isValid && nickName.length > 0 && (
            <div className="text-ppink text-sm font-regular">
              띄어쓰기 포함 10자 이내로 입력해주세요.
            </div>
          )}
        </div>
      </div>
      <Button
        gray={!isValid}
        disabled={!isValid}
        onClick={() => {
          handleCoupleNickName(nickName);
        }}
      >
        다음
      </Button>
    </div>
  );
};

export default NickNamePage;
