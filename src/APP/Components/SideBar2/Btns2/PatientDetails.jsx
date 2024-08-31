import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { RiUser2Fill } from "react-icons/ri";

function PatientDetails({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const id = localStorage.getItem("universalPatientId")

  useEffect(() => {
    if (location?.pathname===(`/viewPatient/${id}`)) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate(`/viewPatient/${id}`)}
      active={active}
      Icon={<RiUser2Fill />}
      txt="Dashboard"
      open={open}
    />
  );
}

export default PatientDetails;
