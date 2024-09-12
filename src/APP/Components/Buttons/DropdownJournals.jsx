import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function DropdownBtnJournals({ Icon = <></>, txt = "", active = true, open = false, onClick = () => {}, dropdownItems = []}) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const handleButtonClick = () => {
        console.log(dropdownItems)
        setDropdownOpen(!isDropdownOpen);
        onClick();
    };
    useEffect(() => {
        if (location?.pathname?.includes("/wards")) {
          setDropdownOpen(true);
          return;
        }
        setDropdownOpen(false);
      }, [location]);
    return (
        <div>
            <div
                className="border-2 bg-secondary hover:bg-green-600 text-white w-auto h-2 py-6 px-8 rounded-md font-poppins font-bold flex items-center mx-4"
                onClick={handleButtonClick}
            >
                <div className="flex justify-between w-full items-center px-2">
                <span className="mr-2">{txt}</span>
                <span className="text-md">
                {!isDropdownOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </span>
                </div>
            </div>

            {isDropdownOpen && (
                <div className="mt-2 flex flex-col absolute bottom-82 bg-white shadow-lg rounded-lg">
                    {dropdownItems?.map((item, index) => (
                        <div 
                            key={index} 
                            className="px-2 py-2 cursor-pointer hover:bg-gray-200"
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
export default DropdownBtnJournals;
