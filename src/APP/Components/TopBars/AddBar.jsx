import React from "react";
import PropTypes from "prop-types";
import grayPanel from "../Container/Container";


function AddBar({ title, txtBtn}) {
  return (
    <div className={grayPanel()}>
      <div className="flex flex-row space-x-50 pl-2">
        <h1 className="text-3xl font-bold">{title + ""}</h1>
        <div className="flex items-center space-x-4">
          <button
            className="border-1 border-black bg-yellow-500 text-black w-auto pr-5 pl-4 h-10 items-center rounded-full font-bold flex "
            type="submit"
          >
            <p className="">{txtBtn}</p>
          </button>
          
        </div>
      </div>
    </div>
  );
}
AddBar.propTypes = {
  title: PropTypes.string.isRequired, // Validates that 'title' is a required string
  txtBtn: PropTypes.string.isRequired, // Validates that 'title' is a required string
  
};

export default AddBar;
