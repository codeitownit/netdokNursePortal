import React, { ReactNode } from "react";
import Btn from "../Btn";

interface btn_props {
  label?: string;
  children?: ReactNode;
  btn?: "primary" | "secondary" | "red";
  size?: "block" | "auto";
  outline?: boolean;
  onClick?: () => void;
}

const BtnLgIcon: React.FC<btn_props> = ({
  btn = "primary",
  label = "Label",
  children = null,
  onClick = () => {},
  outline = false,
  size = "block",
}) => {
  return (
    <Btn
      btn={btn}
      size={size}
      rounded="rounded-md"
      onClick={onClick}
      padding="sm"
      outline={outline}
    >
      <div className=" flex w-full justify-center items-center gap-x-3 text-white px-6">
        <span className=" text-xl md:text-3xl">{children}</span>
        <span className="  text-base md:text-2xl font-medium">{label}</span>
      </div>
    </Btn>
  );
};

export default BtnLgIcon;
