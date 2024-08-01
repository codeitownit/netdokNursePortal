import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { MdOutlineEventAvailable } from "react-icons/md";

function Calendar({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  //console.log(location)

  useEffect(() => {
    if (location?.pathname?.includes("/calendar")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/calendar")}
      active={active}
      Icon={<MdOutlineEventAvailable />}
      txt="Calendar"
      open={open}
    />
  );
}

export default Calendar;
