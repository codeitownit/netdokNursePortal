/* eslint-disable react/prop-types */

import { HiXMark } from "react-icons/hi2";

const Filter = ({
  apply = () => {},
  setShowFilter = () => {},
  headText = "Filter",
  children,
  btn1Txt = "Cancel",
  btn2Txt = "Apply",
  showBtn1 = true,
  showBtn2 = true,
}) => {
  return (
    <div className=" h-full flex w-full justify-end ">
      <div className=" w-fit bg-white h-full overflow-y-auto flex flex-col rounded-l-lg">
        <FilterTopBar setShowFilter={setShowFilter} headText={headText} />
        <div className="px-6 py-6">{children}</div>
        <div className="flex-1"></div>
        <div className="w-full flex flex-row sticky">
          {showBtn1 && (
            <div
              onClick={() => setShowFilter(false)}
              className="  cursor-pointer w-fit  flex flex-row justify-center items-center px-8 py-2  font-DM-Bold text-base text-black active:opacity-20"
            >
              {btn1Txt}
            </div>
          )}
          {showBtn2 && (
            <div
              onClick={apply}
              className=" flex-1  cursor-pointer flex flex-row justify-center items-center px-6 py-2  font-DM-Bold text-base bg-primary  text-white active:opacity-25"
            >
              {btn2Txt}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterTopBar = ({ setShowFilter, headText }) => {
  return (
    <div
      className=" flex justify-between items-center px-6 mt-4"
      style={{ minWidth: "320px" }}
    >
      <p className="  text-cadet_grey text-2xl tracking-wider">{headText}</p>
      <p
        onClick={() => setShowFilter(false)}
        className=" text-3xl active:opacity-20   text-black cursor-pointer active:text-primary"
      >
        <HiXMark />
      </p>
    </div>
  );
};

export default Filter;
