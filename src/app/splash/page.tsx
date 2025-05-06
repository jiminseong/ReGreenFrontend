"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashContent from "@/widgets/splash/SplashContent";

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push(`/onboard`), 3050);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashContent />;
};

export default SplashPage;
