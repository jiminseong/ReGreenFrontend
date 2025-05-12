interface WiggleBadgeProps {
  value: string; // ex: '+20000'
  type: "heart" | "calendar";
}

const WiggleBadge: React.FC<WiggleBadgeProps> = ({ value, type }) => {
  const textValue = type === "calendar" ? "D-" + value : value;
  const length = textValue.length;
  const fontSizeClass = length <= 4 ? "text-[16px]" : length === 5 ? "text-[14px]" : "text-[12px]";

  const bgImage =
    type === "heart"
      ? "bg-[url('/image/home/heartBackground.svg')]"
      : "bg-[url('/image/home/calendarBackground.svg')]";

  const textColor = type === "heart" ? "text-ppink" : "text-black";

  const paddingLeft = length <= 3 ? "pl-[24px]" : length === 4 ? "pl-[15px]" : "pl-[6px]";

  return (
    <div
      className={`relative w-[84px] h-[32px] ${paddingLeft} ${bgImage} bg-contain bg-no-repeat flex items-center justify-center px-1`}
    >
      <span className={`${textColor} font-bold leading-none ${fontSizeClass}`}>{textValue}</span>
    </div>
  );
};

export default WiggleBadge;
