/* eslint-disable react/prop-types */

import { colors } from "./colors";

const Pagination = ({
  page = 1,
  hasNextPage = false,
  hasPrevPage = false,
  nextClick = () => {},
  prevClick = () => {},
  mt = 0,
  mb = 0,
  showPagination = true,
}) => {
  if (!showPagination) return null;

  function handlePrevClick() {
    if (!hasPrevPage || page === 1) {
      return;
    }
    prevClick();
  }
  function handleNextClick() {
    if (!hasNextPage) {
      return;
    }
    nextClick();
  }

  return (
    <div
      style={{ marginTop: `${mt}em`, marginBottom: `${mb}em` }}
      className=" w-full flex justify-center items-center gap-x-4 mt-4"
    >
      <span
        className=" text-lg cursor-pointer active:opacity-25 p-2 hover:bg-gray-200 hover:rounded-md"
        style={{
          color: hasPrevPage && page > 1 ? colors.primary : colors.cadet_grey,
        }}
        onClick={handlePrevClick}
      >
        Prev
      </span>
      <span className="  rounded-lg bg-amber-500 text-white  font-bold py-1 px-4 text-lg p-2 ">
        {page}
      </span>
      <span
        className=" text-lg cursor-pointer hover:bg-gray-200 hover:rounded-md active:opacity-25 p-2"
        style={{
          color: hasNextPage ? colors.black : colors.cadet_grey,
        }}
        onClick={handleNextClick}
      >
        Next
      </span>
    </div>
  );
};

export default Pagination;
