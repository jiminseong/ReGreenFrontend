"use client";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CoupleGuard = () => {
  const router = useRouter();
  const { data, isSuccess, isError, isPending } = useMyInfo();

  useEffect(() => {
    if (!isPending && isError) {
      router.push("/login");
      return;
    }
    if (!isSuccess) return;
    if (isSuccess && data.coupleId === null) {
      console.warn("커플이 없어 /couple로 이동");
      router.push("/couple");
    }
  }, [isSuccess, data?.coupleId, router]);

  return null;
};

export default CoupleGuard;
