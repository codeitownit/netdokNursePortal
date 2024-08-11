import React, { useState } from "react";
// import TextInput from '../Inputs/TextInput'
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

function GlobalTopBar() {
  const username = localStorage.getItem("universalDoctorName")
  return (
    <div
      className=" w-full h-15 mb-8 text-2xl shadow-lg bg-primary bg-opacity-90 flex items-center rounded-full mx-auto"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <h1 className="mx-6 text-white font-bold">Hello, 
        {/* {username} */}
        </h1>
      {/* <TextInput
                className="h-10 rounded-full p-3 mb-3 w-full"
                placeholder="Search"
                label="Search"
                input={searchInput}
                setInput={setSearchInput}
              /> */}
      <div className="flex ml-auto items-center">
        <FaBell className="text-2xl text-slate-100 mb-2 mr-5" />
        <IoMdSettings className="text-2xl text-slate-100 mb-2 mr-5" />
        <FaUserCircle className="text-5xl text-slate-100 mb-2 mr-2" />
      </div>
    </div>
  );
}

export default GlobalTopBar;
