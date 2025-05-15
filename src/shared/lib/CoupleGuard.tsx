"use client";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CoupleGuard = () => {
  const router = useRouter();
  const { data, isSuccess } = useMyInfo();

  useEffect(() => {
    if (isSuccess && data.coupleId !== null) {
      return;
    }
    router.push("/couple");
  }, []);
  return null;
};

export default CoupleGuard;
