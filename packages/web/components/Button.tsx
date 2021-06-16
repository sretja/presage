import React, {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

const sizes = {
  big: "py-2 px-6 rounded-lg",
  small: "px-5 py-1.5 rounded-lg",
};

const colors = {
  primary:
    "text-gray-700 bg-primary hover:bg-primary-light disabled:opacity-50",
  gray:
    "text-gray-100 bg-gray-500 hover:bg-gray-400 disabled:text-gray-200 disabled:opacity-50",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  icon?: ReactNode;
  transition?: boolean;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  size = "big",
  color = "primary",
  icon,
  loading,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${sizes[size]} ${colors[color]} focus:outline-none focus-visible:ring inline-flex items-center justify-center transition ${className}`}
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
        <p className={`font-bold ${size === "small" ? "small" : ""}`}>
          {children}
        </p>
      </span>
      {loading ? <div className="spinner absolute" /> : null}
    </button>
  );
};