"use client"
import React from "react";
interface ButtonProps {
  id?: string;
  disabled?: boolean;
  name?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: React.ReactNode; // Assuming icon can be any valid React node
}
const Button: React.FC<ButtonProps> = ({
  id,
  disabled,
  name,
  style,
  type = "button",
  title,
  onClick,
  className,
  icon,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick(e);
  };

  return (
    <button
      className={className ? className : "group flex flex-row items-center justify-center bg-black text-white rounded-full transition-all relative w-full hover:bg-black/50 before:content-[''] before:absolute before:w-full before:h-full before:rounded-full before:border-solid before:border-black/50 before:border before:py-0 before:opacity-0 before:transition-all hover:before:w-full-xl hover:before:py-4 hover:before:opacity-100 active:before:py-5 active:before:w-full-2xl active:before:border-black/50 active:before:border active:before:bg-black/10 active:bg-black"}
      id={id}
      disabled={disabled}
      name={name}
      style={style}
      type={type}
      onClick={handleClick}
    >
      {icon}
      <span className="select-none relative text-white z-3">{title}</span>
    </button>
  );
};

export default Button;
