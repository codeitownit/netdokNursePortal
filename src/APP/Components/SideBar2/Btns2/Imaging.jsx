import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { RiScanLine } from "react-icons/ri";

function Imaging({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/imaging")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/viewPatient/:id/imaging")}
      active={active}
      Icon={<RiScanLine />}
      txt="Imaging"
      open={open}
    />
  );
}

export default Imaging;
