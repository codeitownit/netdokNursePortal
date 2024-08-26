import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";
import DropdownTemplate from "../Btns/DropdownTemplate";

import { GiMedicines } from "react-icons/gi";

function Medicine({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const patientId = localStorage.getItem("universalPatientId")

  useEffect(() => {
    if (location?.pathname?.includes("/medicine")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  const dropdownItems = [
    { label: "View Current Prescription", onClick: () => navigate(`/viewPatient/${patientId}/medicine/current`)},
    { label: "View Posed Prescription", onClick: () => navigate(`/viewPatient/${patientId}/medicine/posed`) },
    { label: "View Previous Prescription", onClick: () => navigate(`/viewPatient/${patientId}/medicine/previous`) }
  ];

  return (
    <DropdownTemplate
      active={active}
      Icon={<GiMedicines />}
      txt="Medicine"
      open={open}
      dropdownItems={dropdownItems}
    />
  );
}

export default Medicine;
