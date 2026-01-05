import type { FC, ReactNode } from "react";

import "./Button.css";

type ButtonProps = {
  title: string;
  variant?: "primary" | "outline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
  title,
  variant = "primary",
  type = "button",
  disabled = false,
  icon,
  onClick,
  isLoading = false,
}) => {
  return (
    <button
      className={`common-button ${variant} ${isLoading ? "btn-loader" : ""}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="common-button-icon">{icon}</span>}
      {!isLoading && title}
      {isLoading && <span className="btn-spinner"></span>}
    </button>
  );
};

export default Button;
