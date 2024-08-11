import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { TfiWrite } from "react-icons/tfi";

function JournalsBtn({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const id = localStorage.getItem("universalPatientId")

  useEffect(() => {
    if (location?.pathname?.includes("/progressJournals")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate(`/viewPatient/${id}/progressJournals`)}
      active={active}
      Icon={<TfiWrite />}
      txt="Nurse Journals"
      open={open}
    />
  );
}

export default JournalsBtn;
