import React, { ReactNode } from "react";
import Btn from "../Btn";

interface btn_props {
  label?: string;
  btn?: "primary" | "secondary";
  onClick?: () => void;
  isFiltered?: boolean;
  setOpenFilter?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClearFilter: React.FC<btn_props> = ({
  btn = "primary",
  label = "Clear Filters ?",
  onClick = () => {},
  isFiltered = false,
}) => {
  if (isFiltered === false) return null;
  return (
    <Btn
      btn={btn}
      size="auto"
      rounded="rounded-md"
      onClick={onClick}
      padding="sm"
    >
      <div className=" flex gap-x-2 items-center ">
        <span className=" text-lg">{label}</span>
      </div>
    </Btn>
  );
};

export default ClearFilter;
