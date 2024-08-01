import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { FaArrowsDownToPeople } from "react-icons/fa6";

function Roles({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/roles")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/roles")}
      active={active}
      Icon={<FaArrowsDownToPeople />}
      txt="Roles"
      open={open}
    />
  );
}

export default Roles;
