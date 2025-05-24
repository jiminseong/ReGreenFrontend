import React from "react";

interface TextBoxProps {
  message: React.ReactNode;
  onConfirm?: () => void;
  progress?: number;
  maxProgress?: number;
  // 말풍선 삼각형 꼭지 위치
  trianglePosition?: "leftTop" | "rightTop" | "bottomLeft" | "bottomRight";
  //추가 스타일
  className?: string;
}

const TextBox = ({
  message,
  onConfirm,
  progress,
  maxProgress = 3,
  trianglePosition = "leftTop",
  className = "",
}: TextBoxProps) => {
  return (
    <div className={`relative bg-white px-7 py-5 rounded-lg  ${className}`}>
      {/* 말풍선 삼각형 꼭지 부분 */}
      <div
        className={`absolute ${
          trianglePosition === "leftTop"
            ? "-top-2 left-5"
            : trianglePosition === "bottomLeft"
            ? "bottom-[-8px] left-5"
            : trianglePosition === "bottomRight"
            ? "bottom-[-8px] right-5"
            : trianglePosition === "rightTop"
            ? "-top-2 right-5"
            : ""
        }  w-4 h-4 bg-white rotate-45`}
      />
      {message}
      {progress !== undefined && (
        <div className="flex items-center justify-between mt-4">
          {onConfirm && (
            <button
              className="bg-ppink text-sm font-semibold px-2.5 py-1 text-white rounded-4xl"
              onClick={onConfirm}
            >
              {progress + 1 === maxProgress ? "완료" : "다음"}
            </button>
          )}

          <span className="text-[#FF387F80]">
            {progress + 1}/{maxProgress}
          </span>
        </div>
      )}
    </div>
  );
};

export default TextBox;
