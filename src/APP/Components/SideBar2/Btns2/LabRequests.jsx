import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownTemplate from "../Btns/DropdownTemplate";

import { FaPersonChalkboard } from "react-icons/fa6";

function Imaging({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const patientId = localStorage.getItem("universalPatientId")

  useEffect(() => {
    if (location?.pathname?.includes("/labRequests")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  const dropdownItems = [
    { label: "Recent Lab Requests", onClick: () => navigate(`/viewPatient/${patientId}/labRequests/current`)},
    { label: "Concluded Lab Requests", onClick: () => navigate(`/viewPatient/${patientId}/labRequests/concluded`) }
  ];

  return (
    <DropdownTemplate
      active={active}
      Icon={<FaPersonChalkboard />}
      txt="LabRequests"
      open={open}
      dropdownItems={dropdownItems}
    />
  );
}

export default Imaging;
