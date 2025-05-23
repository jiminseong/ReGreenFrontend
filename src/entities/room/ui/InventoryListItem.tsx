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
      onClick={item.name === "기본 룸쉘" ? () => {} : () => onToggle()}
      className={`relative ${
        isOwned || item.name === "기본 룸쉘"
          ? "bg-[#F5F5F5] rounded-[20px] border border-[#DEDEDE]"
          : ""
      } flex flex-col items-center  px-6 py-3 md:py-5.5 cursor-pointer`}
    >
      {/* isPlaced가 true이거나 item.name === "기본 룸쉘" 인 경우 체크 표시 */}
      {isPlaced && (
        <Image
          className={`absolute top-3.5 right-3.75 ${isPlaced === true ? "visible" : "hidden"}`}
          src="/icon/home/checkIcon.svg"
          alt="체크아이콘"
          width={14}
          height={14}
        />
      )}
      {item.name === "기본 룸쉘" && (
        <Image
          className={`absolute top-3.5 right-3.75 visible"`}
          src="/icon/home/checkIcon.svg"
          alt="체크아이콘"
          width={14}
          height={14}
        />
      )}

      {/* 이미지 높이 고정 */}
      <div className="w-[62px] h-[58px] relative  flex items-center justify-center mt-2">
        <Image src={item.previewImageUrl} fill className="object-cover" alt={item.name} />
      </div>
      <p
        className={`${
          item.name.length >= 8 && item.name.length < 9
            ? "text-xs"
            : item.name.length >= 9
            ? "text-[11px]"
            : ""
        } mt-2 text-sm whitespace-pre-line py-auto text-center w-[80px]`}
      >
        {item.name}
      </p>
      {isOwned || item.name === "기본 룸쉘" ? (
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
