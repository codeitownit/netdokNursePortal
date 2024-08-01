import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { MdOutlinePersonPinCircle } from "react-icons/md";

function Transferred({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  //console.log(location)

  useEffect(() => {
    if (location?.pathname?.includes("/transfer")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/transfer")}
      active={active}
      Icon={<MdOutlinePersonPinCircle />}
      txt="Transferred Patients"
      open={open}
    />
  );
}

export default Transferred;
