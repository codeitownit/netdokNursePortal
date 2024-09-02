import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

function DropdownBtnProfile({ Icon = <></>, txt = "", active = true, open = false, onClick = () => {}, dropdownItems = []}) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const handleButtonClick = () => {
        console.log(dropdownItems)
        setDropdownOpen(!isDropdownOpen);
        onClick();
    };
    // useEffect(() => {
    //     if (location?.pathname?.includes("/wards")) {
    //       setDropdownOpen(true);
    //       return;
    //     }
    //     setDropdownOpen(false);
    //   }, [location]);
    return (
        <div>
            <div
                className="text-white w-auto h-10 py-2 px-2 rounded-md font-poppins font-bold flex items-center text-3xl mb-2 mt-2 hover:cursor-pointer"
                onClick={handleButtonClick}
            >
                <div className="flex justify-between w-full items-center">
                <FaUserCircle
        //   className="text-5xl text-slate-100 mb-2 mr-2 hover:cursor-pointer"
        //   onClick={() => navigate("/dashboard/profile")}
        />
                <span className="text-md">
                {!isDropdownOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                </span>
                </div>
            </div>

            {isDropdownOpen && (
                <div className="mt-2 flex flex-col absolute top-10 right-5 bg-white shadow-lg rounded-lg">
                    {dropdownItems?.map((item, index) => (
                        <div 
                            key={index} 
                            className="px-2 text-md py-2 flex relative top-3 cursor-pointer hover:bg-gray-200"
                            onClick={item?.onClick}
                        >
                            {item?.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownBtnProfile;
