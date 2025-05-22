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
  const [didRedirect, setDidRedirect] = useState(false);

  useEffect(() => {
    if (didRedirect) return;

    const onboarded = localStorage.getItem("onboarded");
    const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && window.navigator.standalone === true);

    setIsIOS(isIOSDevice);

    if (isSuccess) {
      setDidRedirect(true);
      if (data?.coupleId) {
        router.push("/home");
      } else {
        router.push("/couple");
      }
    } else if (isStandalone && !onboarded) {
      setDidRedirect(true);
      router.push("/onboard");
    } else if (!isSuccess && onboarded) {
      setDidRedirect(true);
      router.push("/login");
    } else {
      setShowPrompt(true);
    }
  }, [isSuccess, data, didRedirect]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      {showPrompt && <InstallPrompt isIOS={isIOS} />}
    </main>
  );
}
