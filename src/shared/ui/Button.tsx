interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} w-full px-4 py-4 bg-lpink text-ppink rounded-lg`}
    >
      {children}
    </button>
  );
};
export default Button;
