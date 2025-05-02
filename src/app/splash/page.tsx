"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const SplashPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => router.push(`/onboard`), 1000);
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Image src="/192.webp" alt="로고" width={100} height={100} />
      <h1 className="text-2xl font-bold mt-4">wooimi</h1>
    </motion.div>
  );
};

export default SplashPage;
