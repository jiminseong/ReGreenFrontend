"use client";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CoupleGuard = () => {
  const router = useRouter();
  const { data, isSuccess } = useMyInfo();

  useEffect(() => {
    if (!isSuccess) return;

    console.log("CoupleGuard", data, isSuccess);

    if (data.coupleId === null) {
      console.error("커플이 없습니다.");
      router.push("/couple");
    } else {
      console.error("이미 커플이 있습니다.");
    }
  }, [isSuccess, data, router]);

  return null;
};

export default CoupleGuard;
