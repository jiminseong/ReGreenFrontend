import Image from "next/image";
import React from "react";
import { CoupleType } from "../model/type";

interface CoupleProfileProps {
  size?: "large" | "small";
  className?: string;
  couple1?: CoupleType;
  couple2?: CoupleType;
}

const CoupleProfile: React.FC<CoupleProfileProps> = ({
  size = "small",
  className = "",
  couple1 = { name: "이름1", image: "/image/home/tempCouple1.png" },
  couple2 = { name: "이름2", image: "/image/home/tempCouple2.png" },
}) => {
  const imageSize = size === "large" ? 99 : 39;
  const heartWidth = size === "large" ? 15 : 10;
  const heartHeight = size === "large" ? 14.25 : 9.25;

  return (
    <div className={`flex items-end justify-center ${className}`}>
      {/* 커플 1 */}
      <div className="flex flex-col items-center gap-2.5">
        <Image
          className="rounded-full"
          src={couple1.image}
          alt="커플 프로필"
          width={imageSize}
          height={imageSize}
        />
        <p className={`font-bold ${size === "large" ? "" : "text-sm"}`}>{couple1.name}</p>
      </div>

      {/* 하트 아이콘 */}
      <div className="py-1 flex items-center justify-center">
        <Image
          src="/icon/home/lightHeartIcon.svg"
          alt="하트 아이콘"
          width={heartWidth}
          height={heartHeight}
        />
      </div>

      {/* 커플 2 */}
      <div className="flex flex-col items-center gap-2.5">
        <Image
          className="rounded-full"
          src={couple2.image}
          alt="커플 프로필"
          width={imageSize}
          height={imageSize}
        />
        <p className={`font-bold ${size === "large" ? "" : "text-sm"}`}>{couple2.name}</p>
      </div>
    </div>
  );
};

export default CoupleProfile;
