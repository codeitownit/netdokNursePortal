import { Outlet } from "react-router-dom";
import bgimage from "../../../Assets/BgImages/bg_image.svg";
import GlobalTopBar from "../../../Components/TopBars/GlobalTopBar";

import MobBar2 from "../../../Components/SideBar2/MobBar2";
// import {useState } from "react";

import InnerSideBar from "../../../Components/SideBar2/InnerSideBar";

function Dashboard2() {
  return (
    <>
    <div className="w-full">
      <GlobalTopBar />
      </div>
    <div
      className=" w-screen h-screen flex gap-x-2 overflow-hidden bg-no-repeat bg-cover bg-position-center bg-slate-50"
      style={{
        // backgroundImage: `url(${bgimage})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
      {/* <div className={`${open ? "w-72":"w-20"} h-screen relative`}> */}
      {/* <div className=" hidden md:block"><PageSidebar /></div> */}
      <InnerSideBar />
      {/* <button onClick={()=>setOpen(!open)} className="absolute left-[230px] top-9 w-7 border-2">Exp</button> */}
      {/* </div> */}
      <div className=" flex-1 w-full h-full">
        <MobBar2 />
        <div className="  p-4 font-quicksand w-full h-full relative overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard2;
