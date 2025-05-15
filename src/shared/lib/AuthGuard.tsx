"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }
  }, []);

  return null;
};

export default AuthGuard;
