import React, { ReactNode } from "react";

import { btnClass, btnSizes, btnPadding } from "./btn.style";

interface btn_props {
  btn?: "primary" | "secondary" | "red";
  outline?: boolean;
  ex?: "string";
  rounded?: "rounded-3xl" | "rounded-lg" | "rounded-sm" | "rounded-md";
  size?: "block" | "auto";
  disabled?: boolean;
  onClick?: () => void;
  padding?: "lg" | "sm" | "xsm";
  children?: ReactNode;
  mt?: number;
  mb?: number;
}

const Btn: React.FC<btn_props> = ({
  btn = "primary",
  outline = false,
  ex = "",
  rounded = "rounded-3xl",
  size = "auto",
  disabled = false,
  onClick = () => {},
  padding = "lg",
  children,
  mt = 0,
  mb = 0,
}) => {
  function clickBtn() {
    if (!disabled) {
      onClick();
    }
  }

  return (
    <div
      onClick={clickBtn}
      className={`${btnClass[btn]
        ? btnClass[btn][outline ? "true" : "false"]
        : btnClass["primary"][outline ? "true" : "false"]} ${
        disabled
          ? "cursor-not-allowed bg-gray-300 bg-opacity-50"
          : "cursor-pointer hover:shadow active:shadow-none active:bg-opacity-70 duration-100"
      } ${btnSizes[size] ? btnSizes[size] : btnSizes["auto"]} ${
        rounded ? rounded : "rounded-lg"
      } ${btnPadding[padding] ? btnPadding[padding] : btnPadding["lg"]} ${ex}`}
      style={{ marginTop: `${mt}em`, marginBottom: `${mb}em` }}
    >
      {children}
    </div>
  );
};

export default Btn;
