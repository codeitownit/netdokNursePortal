import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";
import DropdownTemplate from "../Btns/DropdownTemplate";

import { MdVaccines } from "react-icons/md";

function Vaccine({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const patientId = localStorage.getItem("universalPatientId")

  useEffect(() => {
    if (location?.pathname?.includes("/vaccination")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  const dropdownItems = [
    { label: "View Vaccination", onClick: () => navigate(`/viewPatient/${patientId}/vaccination/view`)},
    { label: "Add Vaccination", onClick: () => navigate(`/viewPatient/${patientId}/vaccination/add`) },
  ];

  return (
    <DropdownTemplate
      active={active}
      Icon={<MdVaccines />}
      txt="Administer Vaccination"
      open={open}
      dropdownItems={dropdownItems}
    />
  );
}

export default Vaccine;
