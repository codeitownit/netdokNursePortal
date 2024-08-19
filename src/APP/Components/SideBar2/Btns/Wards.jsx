import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownTemplate from "./DropdownTemplate";
import { IoChatbubblesOutline } from "react-icons/io5";
import useaxios from "../../../Hooks/useAxios";
import { hospitalId } from "../../globals";

function Wards({ open = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [data, setData] = useState(null);
  const request = useaxios()
let dropdownItems = [];
  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: `hospitalOnboarding/hospital/AH-48656`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data.type);
        res?.data.map((item)=>{
            item.wards.map((ward)=>{
                console.log(ward.wardName)
                const id = ward.wardName
                const q = {label:ward.wardName, onClick: () => navigate(`/dashboard/wards/view/${id}`)}
                dropdownItems.push(q)
                setData(dropdownItems)
                console.log(data)
                
            })
        })
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

window.onload= function () {
    fetchData();
};

  useEffect(() => {
    if (location?.pathname?.includes("/wards")) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [location]);

  return (
    <DropdownTemplate
      active={active}
      Icon={<IoChatbubblesOutline />}
      txt="Wards"
      open={open}
      dropdownItems={data}
    />
  );
}

export default Wards;
