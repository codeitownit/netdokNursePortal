import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { TfiWrite } from "react-icons/tfi";

function Exams({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  //console.log(location)

  useEffect(() => {
    if (location?.pathname?.includes("/exam")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/exam")}
      active={active}
      Icon={<TfiWrite />}
      txt="Exams"
      open={open}
    />
  );
}

export default Exams;
