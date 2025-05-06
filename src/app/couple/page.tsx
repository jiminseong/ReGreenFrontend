"use client";

import Button from "@/shared/ui/Button";
import Image from "next/image";

const CoupleCheckPage = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen p-5 pt-24">
      <h1 className="text-2xl text-left w-full font-bold mb-4">
        친구, 연인을 <br />
        초대해 주세요!
      </h1>
      <Image src="/image/couple/couple1.png" width={255} height={260} alt="일러스트" />
      <div className="w-full flex flex-col gap-2">
        <Button onClick={() => console.log(1)}>초대하러 가기 {">"} </Button>
        <Button active={false} onClick={() => console.log(1)}>
          초대받으러 가기 {">"}
        </Button>
      </div>
    </div>
  );
};

export default CoupleCheckPage;
