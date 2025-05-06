interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, active = true }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} w-full px-4 py-4 rounded-lg font-bold ${
        active ? "bg-lpink text-ppink " : "bg-[#EEEEEE] text-[#999999] "
      }`}
    >
      {children}
    </button>
  );
};
export default Button;
