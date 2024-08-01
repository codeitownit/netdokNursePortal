import React, { ReactNode } from "react";
import Btn from "../Btn";

import { MdFilterList, MdFilterListOff } from "react-icons/md";

interface btn_props {
  label?: string;
  btn?: "primary" | "secondary";
  onClick?: () => void;
  isFiltered?: boolean;
  setOpenFilter?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BtnFilter: React.FC<btn_props> = ({
  btn = "primary",
  label = "Filter",
  onClick = () => {},
  isFiltered = false,
  setOpenFilter = () => {},
}) => {
  function handlePress() {
    setOpenFilter(true);
    onClick();
  }

  return (
    <Btn
      btn={btn}
      size="auto"
      rounded="rounded-md"
      onClick={handlePress}
      padding="sm"
    >
      <div className=" flex gap-x-2 items-center ">
        <span className=" text-white text-2xl">
          {isFiltered === false ? <MdFilterListOff /> : <MdFilterList />}
        </span>
        <span className=" text-lg">{label}</span>
      </div>
    </Btn>
  );
};

export default BtnFilter;
