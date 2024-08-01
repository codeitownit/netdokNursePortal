import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { GiMedicines } from "react-icons/gi";

function Medicine({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  //console.log(location)

  useEffect(() => {
    if (location?.pathname?.includes("/medicine")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/viewPatient/:id/medicine")}
      active={active}
      Icon={<GiMedicines />}
      txt="Medicine"
      open={open}
    />
  );
}

export default Medicine;
