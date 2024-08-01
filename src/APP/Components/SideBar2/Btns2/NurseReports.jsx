import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { FaBookMedical } from "react-icons/fa";

function NurseReports({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/nurseReports")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/viewPatient/:id/nurseReports")}
      active={active}
      Icon={<FaBookMedical />}
      txt="Nurse Reports"
      open={open}
    />
  );
}

export default NurseReports;
