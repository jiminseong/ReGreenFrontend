"use client";

export const SkeletonFinishedActivityList = () => {
  return (
    <div className="p-4 space-y-6 bg-[#F1F2F5] h-[100dvh] animate-pulse">
      {/* 활동 유형 3개 Skeleton */}
      {[1, 2, 3].map((_, i) => (
        <div key={i}>
          {/* 활동 제목 */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="h-4 w-36 bg-gray-300 rounded" />
          </div>

          {/* 카드 2개 (좌우) */}
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map((_, j) => (
              <div key={j} className="bg-white w-full rounded-xl px-4 py-5 flex flex-col space-y-2">
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="flex justify-center space-x-3 mt-2">
                  <div className="h-4 w-12 bg-pink-200 rounded" />
                  <div className="h-4 w-12 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
