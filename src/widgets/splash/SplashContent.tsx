import Image from "next/image";
import { motion } from "framer-motion";

const SplashContent = ({ isSplash }: { isSplash: boolean }) => {
  return (
    //렌더링은 되어있지만 보이지 않음
    //애니메이션이 끝나면 사라짐
    // isSplash false여도 렌더링 되어있게 -> 깜빡이는 현상 방지
    // ex) isSplash ? "hidden" : "block"

    <motion.div
      className={`flex flex-col items-center justify-center h-screen pb-12 bg-white ${
        isSplash ? "hidden" : "block"
      }`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
    >
      <Image src="/icon/splash/logo.png" alt="로고" width={100} height={100} />
    </motion.div>
  );
};

export default SplashContent;
