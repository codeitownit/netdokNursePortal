import React from "react";
import { BiFilter } from "react-icons/bi";

function FilterButton() {
  function handleFilterBtn() {
    ////console.log('clicked on the filter button')
  }
  return (
    <div>
      <button
        className="border-2 border-gray-200 bg-gray-300 text-black w-auto pr-5 pl-4 h-10 rounded-full font-bold flex items-center space-x-2"
        type="submit"
        onClick={handleFilterBtn}
      >
        <BiFilter className="text-2xl text-gray-500" />
        <span className="text-gray-500">Filter</span>
      </button>
    </div>
  );
}

export default FilterButton;
