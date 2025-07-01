interface WiggleBadgeProps {
  value: string;
  type: "heart" | "calendar" | "ranking";
  onClick?: () => void;
}

const WiggleBadge: React.FC<WiggleBadgeProps> = ({ value: rawValue, type, onClick }) => {
  let value = rawValue;
  const rankRange =
    type === "ranking" && Number(value) <= 3
      ? "gold"
      : type === "ranking" && Number(value) <= 10
      ? "silver"
      : "bronze";

  if (type === "heart") {
    value = value.padStart(4, "0");
  } else if (type === "calendar") {
    value = value.padStart(3, "0");
  } else if (type === "ranking") {
    value = value.padStart(2, "0");
  }

  const textValue = type === "calendar" ? "D-" + value : value;

  let bgImage = "";
  if (type === "heart") {
    bgImage = "bg-[url('/image/home/heartBackground.svg')]";
  } else if (type === "calendar") {
    bgImage = "bg-[url('/image/home/calendarBackground.svg')]";
  } else if (rankRange === "gold" && type === "ranking") {
    bgImage = "bg-[url('/image/home/rankingBackgroundGold.svg')]";
  } else if (rankRange === "silver" && type === "ranking") {
    bgImage = "bg-[url('/image/home/rankingBackgroundSilver.svg')]";
  } else if (rankRange === "bronze" && type === "ranking") {
    bgImage = "bg-[url('/image/home/rankingBackgroundBronze.svg')]";
  }

  const textColor =
    type === "heart"
      ? "text-ppink"
      : type === "calendar"
      ? "text-black"
      : type === "ranking" && rankRange === "gold"
      ? "text-[#FF9D00]"
      : type === "ranking" && rankRange === "silver"
      ? "text-[#979797]"
      : type === "ranking" && rankRange === "bronze"
      ? "text-[#694500]"
      : "text-ppink";

  return (
    <div
      className={`relative ${
        type !== "ranking"
          ? "w-[84px] h-[30.55px] md:w-[110px] md:h-[40px]"
          : "w-[63.37px] h-[30.55px] md:w-[81.9px] md:h-[40px]"
      } ${bgImage} bg-cover bg-no-repeat flex items-center justify-end `}
      onClick={onClick}
      draggable={false}
    >
      <span className={`${textColor} mr-2.5 font-bold leading-none text-[15px] md:text-xl`} draggable={false}>
        {textValue}
      </span>
    </div>
  );
};

export default WiggleBadge;
