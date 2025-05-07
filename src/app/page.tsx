"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashContent from "@/widgets/splash/SplashContent";
import InstallPrompt from "@/features/splash/ui/InstallPrompt";

export default function Page() {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
      setIsIOS(isIOSDevice);

      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in window.navigator && window.navigator.standalone === true);

      if (!isStandalone) {
        router.push("/onboard");
      } else {
        setShowPrompt(true);
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      {showPrompt ? <InstallPrompt isIOS={isIOS} /> : <SplashContent />}
    </main>
  );
}
