interface WiggleBadgeProps {
  value: string;
  type: "heart" | "calendar";
  onClick?: () => void;
}

const WiggleBadge: React.FC<WiggleBadgeProps> = ({ value, type, onClick }) => {
  // type이 heart일때 value가 1자리수, 2자리수, 3자리수일 경우 앞에 0을 붙여서 4자리로 맞춤
  // type이 calendar일때 value가 1자리수, 2자리수, 2자리수일 경우 앞에 0을 붙여서 3자리로 맞춤
  if (type === "heart") {
    value = value.padStart(4, "0");
  } else {
    value = value.padStart(3, "0");
  }

  const textValue = type === "calendar" ? "D-" + value : value;

  const bgImage =
    type === "heart"
      ? "bg-[url('/image/home/heartBackground.svg')]"
      : "bg-[url('/image/home/calendarBackground.svg')]";

  const textColor = type === "heart" ? "text-ppink" : "text-black";

  return (
    <div
      className={`relative w-[110px] h-[40px]  ${bgImage} bg-cover bg-no-repeat flex items-center justify-end `}
      onClick={onClick}
    >
      <span className={`${textColor} mr-2.5 font-bold leading-none text-xl`}>{textValue}</span>
    </div>
  );
};

export default WiggleBadge;
