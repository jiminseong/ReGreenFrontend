import Image from "next/image";
import { motion } from "framer-motion";

const SplashContent = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen pb-12 bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
    >
      <Image src="/icon/splash/logo.png" alt="로고" width={100} height={100} />
    </motion.div>
  );
};

export default SplashContent;
