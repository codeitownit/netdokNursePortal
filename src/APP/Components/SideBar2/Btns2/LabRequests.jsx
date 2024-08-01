import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { FaPersonChalkboard } from "react-icons/fa6";

function LabRequests({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  ////console.log(location)

  useEffect(() => {
    if (location?.pathname?.includes("/labRequests")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/viewPatient/:id/labRequests")}
      active={active}
      Icon={<FaPersonChalkboard />}
      txt="Lab Requests"
      open={open}
    />
  );
}

export default LabRequests;
