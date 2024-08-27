import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";
import DropdownTemplate from "../Btns/DropdownTemplate";

import { RiScanLine } from "react-icons/ri";

function Imaging({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const patientId = localStorage.getItem("universalPatientId")

  useEffect(() => {
    if (location?.pathname?.includes("/imaging")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  const dropdownItems = [
    { label: "Recent Imaging Requests", onClick: () => navigate(`/viewPatient/${patientId}/imaging/current`)},
    { label: "Concluded Imaging Requests", onClick: () => navigate(`/viewPatient/${patientId}/imaging/concluded`) }
  ];

  return (
    <DropdownTemplate
      active={active}
      Icon={<RiScanLine />}
      txt="Imaging"
      open={open}
      dropdownItems={dropdownItems}
    />
  );
}

export default Imaging;
