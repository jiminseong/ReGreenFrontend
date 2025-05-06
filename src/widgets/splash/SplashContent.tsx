import Image from "next/image";
import { motion } from "framer-motion";

const SplashContent = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <Image src="/192.webp" alt="로고" width={100} height={100} />
      <h1 className="text-2xl font-bold mt-4">wooimi</h1>
    </motion.div>
  );
};

export default SplashContent;
