import Image from "next/image";
import React from "react";
import { FurnitureItem } from "@/entities/room/model/type";

interface InventoryListItemProps {
  item: FurnitureItem;
  onToggle: () => void;
  isPlaced: boolean;
  isOwned: boolean;
}

const InventoryListItem: React.FC<InventoryListItemProps> = ({
  item,
  onToggle,
  isPlaced,
  isOwned,
}) => {
  return (
    <div
      onClick={() => onToggle()}
      className={`relative ${
        isOwned ? "bg-[#F5F5F5] rounded-[20px] border border-[#DEDEDE]" : ""
      } flex flex-col items-center px-6 py-3 md:py-5.5 cursor-pointer`}
    >
      {isPlaced && (
        <Image
          className={`absolute top-3.5 right-3.75 ${isPlaced === true ? "visible" : "hidden"}`}
          src="/icon/home/checkIcon.svg"
          alt="체크아이콘"
          width={14}
          height={14}
        />
      )}

      {/* 이미지 높이 고정 */}
      <div className="w-[62px] h-[58px] relative  flex items-center justify-center mt-2">
        <Image src={item.s3PreviewImageUrl} fill className="object-cover" alt={item.name} />
      </div>
      <p className="mt-2 text-sm whitespace-pre-line text-center">{item.name}</p>
      {isOwned ? (
        <span className="mt-2 text-[#777777] text-sm font-semibold">보유중</span>
      ) : (
        <div className="mt-2 flex items-center justify-center gap-1">
          <Image alt="하트아이콘" src="/icon/home/heartIcon.svg" width={14.17} height={12.19} />
          <p className="text-pink-500 text-sm font-semibold">
            {item.price === 0 ? "무료" : item.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(InventoryListItem);
