import { motion } from "framer-motion";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  primary?: boolean;
  gray?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  primary = true,
  children,
  onClick,
  className,
  gray = false,
}) => {
  const bgColor = gray
    ? "bg-[#EEEEEE] text-black"
    : primary
    ? "bg-lpink text-ppink"
    : "bg-[#FFFFFF] text-ppink border-1 border-ppink";
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      type="button"
      onClick={onClick}
      className={`${className} z-5 w-full px-4 py-4 rounded-lg font-bold ${bgColor}`}
    >
      {children}
    </motion.button>
  );
};
export default Button;
