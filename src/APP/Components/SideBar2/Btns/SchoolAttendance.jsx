import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { IoSchool } from "react-icons/io5";

import { FaUsers } from "react-icons/fa";

function SchoolAttendance({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes("/school-attendance")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <BtnTemplate
      onClick={() => navigate("/dashboard/school-attendance")}
      active={active}
      Icon={<FaUsers />}
      txt="Attendance"
      open={open}
    />
  );
}

export default SchoolAttendance;
