import { useState } from "react";
import Dashboard from "./Btns/Dashboard";
import Chat from "./Btns/Chat";
import Logo from "./Btns/LogoSection";
import Discharged from "./Btns/Discharged";
import Transferred from "./Btns/Transferred";
import Notifications from "./Btns/Notifications";
import Calendar from "./Btns/Calendar";
import Wards from "./Btns/Wards";
import Logout from "./Btns/Logout";

function SideBar() {
 

    const [open,setOpen]=useState(false)

    return (<div className=" hidden h-full md:flex flex-col gap-x-4 px-2 bg-white shadow-lg bg-#0E2F59">
       <div>
       <Logo open={open} setOpen={setOpen}/>
       </div>
       <div className=" flex-1 flex flex-col gap-y-4 mt-4">
         <Dashboard open={open}/>
         <Chat open={open}/>
         <Wards open={open} />
         <Discharged open={open}/>
         <Transferred open={open}/>
         <Calendar open={open}/> 
         <Notifications open={open}/> 
        </div>
       <span style={{width:"100%",height:"0.1em", backgroundColor:"rgba(255,255,255,0.4)" }}/>
       <div className=" py-4 flex flex-col gap-y-2">
       <Logout open={open}/>
       </div>
    </div>
  );
}

export default SideBar;
