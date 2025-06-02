"use client";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import React, { useState } from "react";

const NickNamePage = () => {
  const [nickName] = useState<string>("");
  const [nickNameState, setNickNameState] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] p-5 pt-24">
      <div className="flex flex-col w-full gap-6">
        <h1 className="font-bold w-full text-left text-2xl">닉네임을 정해주세요!</h1>
        <Input value={nickName} placeHolder="닉네임을 입력해주세요" active={nickNameState} />
      </div>
      <Button gray={nickNameState} onClick={() => setNickNameState(!nickNameState)}>
        다음
      </Button>
    </div>
  );
};

export default NickNamePage;
