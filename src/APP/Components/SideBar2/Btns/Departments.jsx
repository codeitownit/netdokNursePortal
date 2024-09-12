import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownTemplate from "./DropdownTemplate";
import { FaBed } from "react-icons/fa";
import useaxios from "../../../Hooks/useAxios";
import AppContext from "../../../Provider/Context";

function Deps({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const request = useaxios();
  const { departments } = useContext(AppContext);

  // Generate dropdownItems only once when departments change
  useEffect(() => {
    if (departments && departments.length > 0) {
      const dropdownItems = departments.map((dep) => ({
        label: dep,
        onClick: () => navigate(`/dashboard/departments/view/${dep}`),
      }));
      setData(dropdownItems);
    }
  }, [departments, navigate]);
  // This will run only when `departments` or `navigate` changes

  const fetchData = async () => {
    try {
      // Assuming the request and data processing here
      // const res = await request({
      //   method: "GET",
      //   url: `hospitalOnboarding/hospital/AH-48656`,
      //   body: {},
      //   auth: false,
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (location?.pathname?.includes("/dashboard")) {
      fetchData();
    }
  }, [location]); 

  useEffect(() => {
    if (location?.pathname?.includes("/departments")) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location]);

  return (
    <DropdownTemplate
      active={active}
      Icon={<FaBed />}
      txt="Departments"
      open={open}
      dropdownItems={data}
    />
  );
}

export default Deps;
