import React from "react";

interface ToastProps {
  message: string;
  position?: "top" | "bottom";
}

const Toast: React.FC<ToastProps> = ({ message, position = "bottom" }) => {
  return (
    <div
      className={`
        fixed ${position === "top" ? "top-4" : "bottom-4"} left-1/2 
        transform -translate-x-1/2
        bg-[#000000] opacity-[86%] text-white text-sm font-medium 
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
