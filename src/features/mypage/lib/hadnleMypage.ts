"use client";

import { useRouter } from "next/navigation";

export default function useHandleMypage() {
  const router = useRouter();

  const navigateToMypage = () => {
    router.push("/home/mypage");
  };

  return { navigateToMypage };
}
