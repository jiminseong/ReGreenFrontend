export const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg p-6 flex justify-between items-center">
    <div className="flex gap-4 items-center">
      <div className="bg-gray-300 rounded-full w-14 h-14" />
      <div className="flex flex-col gap-2">
        <div className="bg-gray-300 h-4 w-32 rounded-md" />
        <div className="bg-gray-200 h-3 w-24 rounded-md" />
      </div>
    </div>
    <div className="flex flex-col gap-2 w-[71px]">
      <div className="bg-gray-200 h-6 rounded-[3.54px] w-full" />
      <div className="bg-gray-300 h-6 rounded-[3.54px] w-full" />
    </div>
  </div>
);
