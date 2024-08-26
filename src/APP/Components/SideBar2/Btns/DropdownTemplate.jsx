import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function DropdownTemplate({ Icon = <></>, txt = "", active = true, open = false, onClick = () => {}, dropdownItems = []}) {
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
                className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-slate-700 w-full gap-x-2 transition-all ease-in-out ${open ? 'rounded-2xl px-1 py-1' : ''}`}
                style={{
                    backgroundColor: active && open ? '#a3cc9c' : 'transparent',
                }}
                onClick={handleButtonClick}
            >
                <span className={`text-2xl ${active ? 'text-black' : 'text-white'} p-2 ${active ? 'bg-secondary' : 'bg-primary'} rounded-full`}>
                    {Icon}
                </span>
                <div className="flex justify-between w-full items-center">
                {open && <span className="font-bold text-xl">{txt}</span>}
                <span className="text-2xl">
                {!isDropdownOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </span>
                </div>
            </div>

            {isDropdownOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-lg">
                    {dropdownItems?.map((item, index) => (
                        <div 
                            key={index} 
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
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

export default DropdownTemplate;
