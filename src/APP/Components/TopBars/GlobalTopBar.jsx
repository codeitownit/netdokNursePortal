import React from "react";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function GlobalTopBar() {
  const username = localStorage.getItem("universalDoctorName");
  const navigate = useNavigate();
  
  return (
    <div
      className="w-full h-15 mb-8 text-2xl shadow-lg bg-primary bg-opacity-90 flex items-center rounded-full mx-auto"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <h1 className="mx-6 text-white font-bold">Hello, {username}</h1>

      <div className="flex ml-auto items-center">
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer text-slate-100 mb-2 mr-5" 
          onClick={() => navigate("/dashboard/notifications")}/>
          
            <span className="absolute bottom-5 right-2 h-4 w-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
        
        </div>
        <IoMdSettings className="text-2xl text-slate-100 mb-2 mr-5" />
        <FaUserCircle
          className="text-5xl text-slate-100 mb-2 mr-2 hover:cursor-pointer"
          onClick={() => navigate("/dashboard/profile")}
        />
      </div>
    </div>
  );
}

export default GlobalTopBar;
