import { useToastStore } from "@/shared/model/useToastStore";
import { useEffect } from "react";

interface ToastProps {
  message: string | React.ReactNode;
  position?: "top" | "bottom";
  onClick?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  position = "bottom",

  onClick,
}) => {
  const { isOpen, closeToast, onNext } = useToastStore();
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeToast();
        onNext?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [closeToast, isOpen, onNext]);

  return (
    <div
      onAbort={onClick}
      className={`
        fixed ${position === "top" ? "top-4" : "bottom-4"} left-1/2 
        transform -translate-x-1/2
        bg-[#000000] opacity-85 text-white text-sm font-medium 
        px-4 py-3.5 rounded-xl shadow-lg 
        w-[350px] md:w-[400px]
        z-[9999] transition-opacity duration-300
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
