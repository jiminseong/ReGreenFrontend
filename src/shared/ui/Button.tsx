import { motion } from "framer-motion";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  active?: boolean;
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  primary = true,
  children,
  onClick,
  className,
  active = true,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      type="button"
      onClick={onClick}
      className={`${className} z-5 w-full px-4 py-4 rounded-lg font-bold ${
        active ? "bg-lpink text-ppink " : "bg-[#EEEEEE] text-[#999999] "
      }${primary ? "" : "!bg-[#FFFFFF] border-1 border-ppink "}`}
    >
      {children}
    </motion.button>
  );
};
export default Button;
