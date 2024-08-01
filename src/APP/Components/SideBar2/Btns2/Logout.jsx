import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LogoutBtnTemplate from "./LogoutBtn";

import { IoLogOutSharp } from "react-icons/io5";

function Logout({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/logout")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <LogoutBtnTemplate
      onClick={() => navigate("/")}
      active={active}
      Icon={<IoLogOutSharp />}
      txt="Logout"
      open={open}
    />
  );
}

export default Logout;
