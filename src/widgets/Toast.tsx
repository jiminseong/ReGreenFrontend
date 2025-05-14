import React from "react";

interface ToastProps {
  message: string | React.ReactNode;
  position?: "top" | "bottom";
  onClick?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, position = "bottom", onClick }) => {
  return (
    <div
      onAbort={onClick}
      className={`
        fixed ${position === "top" ? "top-4" : "bottom-4"} left-1/2 
        transform -translate-x-1/2
        bg-[#000000] opacity-85 text-white text-sm font-medium 
        px-4 py-3.5 rounded-xl shadow-lg 
        w-[350px] md:w-[400px]
        z-50 transition-opacity duration-300
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
