import React, {useEffect, useState, useContext} from "react";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../SideBar2/Btns/LogoSection";
import DropdownBtnProfile from "../Buttons/DropdownProfile";
import AppContext from "../../Provider/Context";

function GlobalTopBar() {
  const username = localStorage.getItem("universalDoctorName");
  const patientAge = localStorage.getItem("universalPatientAge");
  const patientGender = localStorage.getItem("universalPatientGender");
  const patientName = localStorage.getItem("universalPatientName");
  const navigate = useNavigate();
  const location = useLocation();

  const[active,setActive]=useState(false)
  // const[open, setOpen] = useState(true);
  const { open, toggleOpen } = useContext(AppContext);


  useEffect(()=>{
      if(location?.pathname==="/dashboard"){
          setActive(true)
          return
      }
      setActive(false)
  },[location])
  const dropdownItems = [
    { label: "Edit Profile", onClick: () => navigate("/dashboard/profile")},
    { label: "LogOut", onClick: () => navigate("/") }
  ];
  return (
    <div
      className="w-full h-15 mb-8 text-2xl shadow-lg bg-primary bg-opacity-90 flex justify-evenly items-center mx-auto"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <Logo open={open} setOpen={toggleOpen}/>
      <h1 className="mx-6 mr-32 text-white font-bold">Net Doc </h1>
      {!active && 
<div className="text-white text-base font-bold">
  <span>Patient Name:{patientName} </span>
  <span>Age:{patientAge} </span>
  <span>Gender:{patientGender} </span>
</div>}

      <div className="flex ml-auto items-center">
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer text-slate-100 mb-2 mr-5" 
          onClick={() => navigate("/dashboard/notifications")}/>
          
            <span className="absolute bottom-5 right-2 h-4 w-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
        
        </div>
        {/* <IoMdSettings className="text-2xl text-slate-100 mb-2 mr-5" /> */}
        {/* <FaUserCircle
          className="text-5xl text-slate-100 mb-2 mr-2 hover:cursor-pointer"
          onClick={() => navigate("/dashboard/profile")}
        /> */}
<DropdownBtnProfile
          className="text-5xl text-slate-100 mb-2 mr-2 hover:cursor-pointer"
      dropdownItems={dropdownItems}
      txt={username}
    />
      </div>
    </div>
  );
}

export default GlobalTopBar;
