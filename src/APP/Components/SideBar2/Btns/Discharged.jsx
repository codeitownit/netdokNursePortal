import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

// import { BsFillBookFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
function Discharged({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/discharged")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/discharged")}
      active={active}
      Icon={<AiFillLike />}
      txt="Discharged Patients"
      open={open}
    />
  );
}

export default Discharged;
