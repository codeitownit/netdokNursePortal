import React from "react";
import PropTypes from "prop-types";
import GrayPanel from "../Container/Container";
import FilterButton from "../Buttons/FilterButton";

function ListBar({ title, txtBtn, isFilter = false }) {
  return (
    <div className={GrayPanel()}>
      <div className="flex flex-row space-x-40 pl-3">
        <h1 className="text-3xl font-bold">{title + " List"}</h1>
        <div className="flex items-center space-x-4">
          <button
            className="border-1 border-black bg-yellow-500 text-black w-auto pr-5 pl-4 h-10 items-center rounded-full font-bold flex "
            type="submit"
          >
            <p className="">{txtBtn}</p>
          </button>
          {isFilter ? <FilterButton /> : null}
          <input
            type="text"
            className="w-auto pl-4 py-2 rounded-full focus:outline-none"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}
ListBar.propTypes = {
  title: PropTypes.string.isRequired, // Validates that 'title' is a required string
  txtBtn: PropTypes.string.isRequired, // Validates that 'title' is a required string
  isFilter: PropTypes.bool.isRequired, // Validates that 'title' is a required string
};

export default ListBar;
