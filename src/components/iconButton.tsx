"use client"
import React from "react";
interface IconButtonProps {
  id?: string;
  disabled?: boolean;
  name?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode; // Assuming icon can be any valid React node
}
const IconButton: React.FC<IconButtonProps> = ({
  id,
  disabled,
  name,
  style,
  type = "button",
  onClick,
  icon,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick(e);
  };

  return (
    <button
      className={"relative cursor-pointer transition-all hover:scale-[1.5] hover:text-red-400 active:scale-[1.8] active:text-red-500"}
      id={id}
      disabled={disabled}
      name={name}
      style={style}
      type={type}
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
