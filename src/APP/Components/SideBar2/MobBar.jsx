import { useState } from "react";
import { BiMenu, BiMenuAltLeft } from "react-icons/bi";

import Dashboard from "./Btns/Dashboard";
import Chat from "./Btns/Chat";
import Discharged from "./Btns/Discharged";
import Transferred from "./Btns/Transferred";
import Notifications from "./Btns/Notifications";
import Calendar from "./Btns/Calendar";

function MobBar() {
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
            <Chat open={true} />
            <Discharged open={true} />
            <Transferred open={true} />
            <Calendar open={open}/> 
            <Notifications open={true} />
        </div>
    );
}

export default MobBar;

