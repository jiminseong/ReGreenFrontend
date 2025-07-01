// 입력 전 : background: #F6F6F6; , border-bottom: 1px solid #000000
// 입력 후 : background: #FFF0F6; , border-bottom: 1px solid #FF387F
interface InputProps {
  placeHolder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  className?: string;
  active?: boolean;
  activeColor?: "blue" | "pink";
}

const Input: React.FC<InputProps> = ({
  placeHolder,
  value,
  className,
  active = true,
  activeColor = "pink",
  onChange,
}) => {
  return (
    <input
      onChange={onChange}
      placeholder={placeHolder}
      value={value}
      className={`${className} w-full px-4 py-4 ${
        active
          ? activeColor === "blue"
            ? "bg-[#EEFBFA] border-b border-[#29C8BD]"
            : "bg-lpink border-b border-ppink"
          : "bg-[#EEEEEE] border-b border-[#999999]"
      }`}
    />
  );
};
export default Input;
