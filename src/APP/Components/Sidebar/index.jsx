import { TiHome } from "react-icons/ti";
import { PiStudentFill } from "react-icons/pi";
// import { RiParentLine } from "react-icons/ri";
import { FaPersonChalkboard } from "react-icons/fa6";
import { BsFillBookFill } from "react-icons/bs";
import { BsFillPhoneFill } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import SidebarItem from "./sidebarItem";

export default function PageSidebar() {
  function sideBarIcons(dashType = 'admin') {
    if (dashType === "admin") {
      return (
        <>
          <SidebarItem icon={<TiHome />} name={"Dashboard"} />
          <SidebarItem icon={<PiStudentFill />} name={"Students"} />
          {/* <SidebarItem icon={<RiParentLine />} name={"Parents"} /> */}
          <SidebarItem icon={<RiParentLine />} name={"Teachers"} />
          <SidebarItem icon={<FaPersonChalkboard />} name={"Classes"} />
          <SidebarItem icon={<BsFillBookFill />} name={"Subjects"} />
          <SidebarItem icon={<BsFillPhoneFill />} name={"Devices"} />
          <SidebarItem icon={<TfiWrite />} name={"Exam"} />
          <SidebarItem icon={<FaArrowsDownToPeople />} name={"Roles"} />
        </>
      );
    } else if (dashType === 'teacher'){
      return (
        <>
          <SidebarItem icon={<TiHome />} name={"Dashboard"} />
          <SidebarItem icon={<PiStudentFill />} name={"Students"} />
          {/* <SidebarItem icon={<RiParentLine />} name={"Parents"} /> */}
          <SidebarItem icon={<FaPersonChalkboard />} name={"Classes"} />
          <SidebarItem icon={<BsFillBookFill />} name={"Subjects"} />
          <SidebarItem icon={<TfiWrite />} name={"Exam"} />
          <SidebarItem icon={<FaArrowsDownToPeople />} name={"Roles"} />
        </>
      );
    // } else if (dashType === 'parent'){
    //   return (
    //     <>
    //       <SidebarItem icon={<TiHome />} name={"Dashboard"} />
    //       <SidebarItem icon={<PiStudentFill />} name={"Students"} />
    //       <SidebarItem icon={<RiParentLine />} name={"Parents"} />
    //       <SidebarItem icon={<RiParentLine />} name={"Teachers"} />
    //       <SidebarItem icon={<FaPersonChalkboard />} name={"Classes"} />
    //       <SidebarItem icon={<TfiWrite />} name={"Exam"} />

    //     </>
    //   );
    }
  }

  return (
    <div className="h-985 w-260">
      {/* <div className="bg-[#0e2f59] rounded-[50px] h-[985px] left-[0] fixed top-[0] w-[260px] mt-6 ml-2"> */}
       <div className=""> {/*this is experimental */}
        <div className="bg-[#d9d9d9] hover:bg-white cursor-pointer rounded-[50px] h-[51px] left-[50px] absolute top-[854px] w-[154px]">
          <div className="items-center flex gap-[5px] h-[38px] left-[5px] relative top-[7px] w-[105px]">
            <div className="bg-[#ff2828] rounded-[19px] h-[38px] -mb-[0.01px] -mt-[0.01px] relative w-[38px]">
              <span
                id="logout-icon"
                className="h-[18px] left-[6px] absolute top-[8px] w-[18px]"
              >
                <IoLogOutSharp />
              </span>
            </div>
            <div className="text-[#000000] font-[Quicksand,_Helvetica] text-[24px] font-bold tracking-[0] leading-[normal] -mr-[27.56px] relative w-[fit-content]">
              Log out
            </div>
          </div>
        </div>
        <div className="items-center inline-flex flex-col gap-[15px] left-[45px] absolute top-[155px]">
            { sideBarIcons('admin') }
        </div>
        <div className="h-[38px] left-[45px] absolute top-[732px] w-[182px]">
          <SidebarItem icon={<IoSchool />} name={"School"} />
        </div>
        <div className="bg-[#d9d9d9] rounded-[20px] h-[60px] left-[30px] absolute top-[12px] w-[200px]">
          <img
            className="h-[40px] left-[20px] object-cover absolute top-[10px] w-[160px]"
            alt="Exhibit logo"
            src="/src/APP/Assets/Exhibit-logo.png"
          />
        </div>
        <hr className="my-8 bg-gray-200 border-0 bg-white-700 h-px left-[25px] object-cover absolute top-[678px] w-[210px]"></hr>
      </div>
    </div>
  );
}