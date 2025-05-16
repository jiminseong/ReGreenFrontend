import Image from "next/image";
import React from "react";

interface DustProfileProps {
  size?: "large" | "small";
  className?: string;
}

const DustProfile: React.FC<DustProfileProps> = ({ size = "small", className = "" }) => {
  const imageSize = size === "large" ? 99 : 134;

  return (
    <div className={`flex items-end justify-center ${className}`}>
      <Image
        src="/image/home/coupleImage.png"
        alt="커플 프로필"
        width={imageSize}
        height={imageSize}
      />
    </div>
  );
};

export default DustProfile;
