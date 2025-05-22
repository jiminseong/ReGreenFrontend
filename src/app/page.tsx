"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InstallPrompt from "@/features/splash/ui/InstallPrompt";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";

export default function Page() {
  const router = useRouter();
  const { data, isSuccess } = useMyInfo();

  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRouting();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess, data]);

  const handleRouting = () => {
    const onboarded = localStorage.getItem("onboarded");
    const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && window.navigator.standalone === true);

    setIsIOS(isIOSDevice);

    if (isSuccess) {
      if (data?.coupleId) {
        router.push("/home");
      } else {
        router.push("/couple");
      }
    } else if (isStandalone && !onboarded) {
      router.push("/onboard");
    } else if (isStandalone && onboarded) {
      router.push("/login");
    } else {
      setShowPrompt(true);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      {showPrompt && <InstallPrompt isIOS={isIOS} />}
    </main>
  );
}
