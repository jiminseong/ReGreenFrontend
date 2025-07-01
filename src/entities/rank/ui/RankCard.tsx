import Image from "next/image";
import { RankingItem } from "../model/type";

export default function RankCard({
  rankingItem,
  rank,
}: {
  rankingItem: RankingItem;
  rank: number;
}) {
  const isFirst = rank === 1;
  const name = rankingItem.name || "익명의 커플";
  const imageUrl = rankingItem.profileImageUrl || "/image/couple/defaultProfile.png";
  return (
    <div
      className={`flex flex-col items-center justify-center  rounded-[10px] max-h-[233px] min-h-[178px] min-w-[114px] ${
        isFirst
          ? "py-3.5 px-[26px]  bg-ppink text-white absolute w-[136px]  "
          : "py-2.5 px-[15px] bg-[#FFF5F9] border-ppink border-1 text-black w-[113px]"
      }`}
    >
      <div
        className={`text-xl font-bold ${
          isFirst
            ? "mb-[11px] bg-white text-center rounded-full w-[28px] h-[28px]"
            : "mb-[6px] bg-transparent"
        } text-pink-500`}
      >
        {rank}
      </div>
      <div
        className={`relative  ${
          isFirst ? "mb-[10px] w-20 h-20 " : "mb-[15px] w-16 h-16"
        }  rounded-full border border-[#F3F3F3] overflow-hidden`}
      >
        <Image alt="커플이미지" src={imageUrl} fill className="object-cover rounded-full" draggable={false}/>
      </div>
      <p
        className={`
    text-sm ${isFirst ? "font-semibold" : "font-regular"}
    flex flex-col justify-center items-center
    leading-5 h-10 overflow-hidden text-center
  `}
      >
        {name.length > 7 ? (
          <>
            <span>{name.slice(0, 7)}</span>
            <span>{name.slice(7)}</span>
          </>
        ) : (
          <span>{name}</span>
        )}
      </p>

      <div className="flex items-center justify-center mt-2 space-x-1">
        {isFirst ? (
          <Image src="/icon/home/whiteHeartIcon.svg" alt="heart" width={16} height={16} draggable={false} />
        ) : (
          <Image src="/icon/home/heartIcon.svg" alt="heart" width={16} height={16} draggable={false}/>
        )}
        <span className="font-semibold flex items-center">{rankingItem.ecoScore}</span>
      </div>
    </div>
  );
}
