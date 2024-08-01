import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { FaUsers } from "react-icons/fa";

function Contact({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/contact")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/viewPatient/:id/contact")}
      active={active}
      Icon={<FaUsers />}
      txt="Contact"
      open={open}
    />
  );
}

export default Contact;
