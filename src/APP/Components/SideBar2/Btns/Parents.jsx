import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { RiParentLine } from "react-icons/ri";

function Parents({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/parents")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/parents")}
      active={active}
      Icon={<RiParentLine />}
      txt="Parents"
      open={open}
    />
  );
}

export default Parents;
