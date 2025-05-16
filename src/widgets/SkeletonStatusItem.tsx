// components/SkeletonStatusItem.tsx
import React from "react";

const SkeletonStatusItem = () => {
  return (
    <div className="animate-pulse bg-white px-4 py-6 rounded-2xl flex justify-between items-center">
      {/* 왼쪽: 아이콘 + 텍스트 */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-gray-300 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-300 rounded" />
          <div className="w-24 h-3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* 오른쪽: 상태 뱃지 */}
      <div className="w-20 h-6 bg-gray-200 rounded-md" />
    </div>
  );
};

export default SkeletonStatusItem;
