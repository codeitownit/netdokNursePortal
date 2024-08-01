import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { IoIosNotifications } from "react-icons/io";

function Notifications({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/classes")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/classes")}
      active={active}
      Icon={<IoIosNotifications />}
      txt="Notifications"
      open={open}
    />
  );
}

export default Notifications;
