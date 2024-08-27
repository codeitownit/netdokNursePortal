import { useState } from "react";
import Dashboard from "./Btns2/Dashboard";
import Imaging from "./Btns2/Imaging";
import LabRequests from "./Btns2/LabRequests";
import Logo from "./Btns/LogoSection";
import Medicine from "./Btns2/Medicine";
import Consult from "./Btns2/Const";
import Contact from "./Btns2/Contact";
import NurseReports from "./Btns2/NurseReports";
import JournalsBtn from "./Btns2/NurseJournals";
import PatientDetails from "./Btns2/PatientDetails";
import Logout from "./Btns/Logout";

function InnerSideBar() {
 

    const [open,setOpen]=useState(true)

    return (<div className=" hidden h-full md:flex flex-col gap-x-4 px-2 bg-white overflow-y-auto mb-20">
       <div>
       <Logo open={open} setOpen={setOpen}/>
       </div>
       <div className=" flex-1 flex flex-col gap-y-4 mt-4">
         <Dashboard open={open}/>
         <PatientDetails open={open} />
         <Contact open={open}/> 
         <Imaging open={open}/>
         <LabRequests open={open}/>
         <NurseReports open={open}/>
         <JournalsBtn open={open} />
         <Medicine open={open}/>
         <Consult open={open}/>
        </div>
       <span style={{width:"100%",height:"0.1em" }}/>
       <div className=" py-4 flex flex-col gap-y-2">
       <Logout open={open}/>
       </div>
    </div>
  );
}

export default InnerSideBar;
