import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownTemplate from "../Btns/DropdownTemplate";
import { FaHandHoldingMedical } from "react-icons/fa6";

function Consult({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const patientId = localStorage.getItem("universalPatientId")

  useEffect(() => {
    if (location?.pathname?.includes("/referral")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  const dropdownItems = [
    { label: "Recent Referral Requests", onClick: () => navigate(`/viewPatient/${patientId}/referral/current`)},
    { label: "Concluded Referral Requests", onClick: () => navigate(`/viewPatient/${patientId}/referral/concluded`) }
  ];

  return (
    <DropdownTemplate
      active={active}
      Icon={<FaHandHoldingMedical />}
      txt="Consultation Referrals"
      open={open}
      dropdownItems={dropdownItems}
    />
  );
}

export default Consult;
