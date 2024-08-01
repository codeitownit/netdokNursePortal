import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { IoChatbubblesOutline } from "react-icons/io5";

function Chat({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  ////console.log(location)

  useEffect(() => {
    if (location?.pathname?.includes("/chat")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/chat")}
      active={active}
      Icon={<IoChatbubblesOutline />}
      txt="Chat"
      open={open}
    />
  );
}

export default Chat;
