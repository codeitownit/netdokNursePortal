import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { FaHandHoldingMedical } from "react-icons/fa6";

function Consult({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const id = localStorage.getItem("universalPatientId")

  //console.log(location)

  useEffect(() => {
    if (location?.pathname?.includes("/referral")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate(`/viewPatient/${id}/referral`)}
      active={active}
      Icon={<FaHandHoldingMedical />}
      txt="Consultation Referrals"
      open={open}
    />
  );
}

export default Consult;
