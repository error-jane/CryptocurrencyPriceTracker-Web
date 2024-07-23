"use client"
import React from "react";
interface ButtonProps {
  id?: string;
  disabled?: boolean;
  name?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  buttonType?: "cancel" | "next";
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
  buttonType,
  icon,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick(e);
  };

  return (
    <button
      className={className}
      id={id}
      disabled={disabled}
      name={name}
      style={style}
      type={type}
      onClick={handleClick}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
