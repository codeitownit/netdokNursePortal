import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
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
                className={`w-full flex items-center gap-x-2 cursor-pointer active:opacity-50 ${open ? 'rounded-2xl px-1 py-1' : ''}`}
                style={{
                    backgroundColor: active && open ? '#a3cc9c' : 'transparent',
                }}
                onClick={handleButtonClick}
            >
                <span className={`text-2xl ${active ? 'text-black' : 'text-white'} p-2 ${active ? 'bg-secondary' : 'bg-primary'} rounded-full`}>
                    {Icon}
                </span>
                {open && <span className="font-bold text-xl">{txt}</span>}
                {!isDropdownOpen ? <IoIosArrowForward /> : <IoIosArrowDown />}
            </div>

            {isDropdownOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-lg">
                    {dropdownItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={item.onClick}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownTemplate;
