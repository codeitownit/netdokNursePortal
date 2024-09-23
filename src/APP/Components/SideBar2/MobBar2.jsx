import { useState } from "react";
import { BiMenu, BiMenuAltLeft } from "react-icons/bi";

import Dashboard from "./Btns2/Dashboard";
import Imaging from "./Btns2/Imaging";
import LabRequests from "./Btns2/LabRequests";
import Medicine from "./Btns2/Medicine";
import Consult from "./Btns2/Const";
import NurseReports from "./Btns2/NurseReports";
import JournalsBtn from "./Btns2/NurseJournals";
import PatientDetails from "./Btns2/PatientDetails";
import Vaccine from "./Btns2/Vaccine";

function MobBar2() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className=" w-full bg-primary md:hidden">
      <span
        className=" cursor-pointer text-5xl active:opacity-20 text-secondary"
        onClick={() => setMenuOpen((c) => !c)}
      >
        {menuOpen ? <BiMenuAltLeft /> : <BiMenu />}
      </span>
      {menuOpen && <MenuBtns />}
    </div>
  );
}

function MenuBtns() {
    return (
        <div className=" flex w-full flex-col gap-y-2 p-2">
            <Dashboard open={true}/>
            <PatientDetails open={true}/>
            <Imaging open={true}/>
            <LabRequests open={true} />
            <JournalsBtn open={true} />
            <Medicine open={true} />
            <Vaccine open={true} />
            <Consult open={true} />
            <NurseReports open={true} />
        </div>
    );
}

export default MobBar2;

