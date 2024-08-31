// import React, { useState } from "react";
// import Button from "./Button";

// function DropdownBtn({ text, onClick, type = "", options = [] }) {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleButtonClick = () => {
//     setShowDropdown((prev) => !prev);
//   };

//   const handleOptionClick = (option) => {
//     onClick(option); // Pass the selected option to the onClick handler
//     setShowDropdown(false); // Close the dropdown after selection
//   };

//   return (
//     <div className="relative inline-block">
//       <Button
        // clss="border-2 border-black bg-green-500 hover:bg-green-600 text-black w-auto h-10 p-2 rounded-md font-poppins font-bold flex items-center mx-4"
//         text={text}
//         onClick={handleButtonClick}
//         type={type}
//       />

//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//           <ul className="py-1">
//             {options.map((option, index) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleOptionClick(option)}
//               >
//                 {option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DropdownBtn;
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function DropdownBtn({ Icon = <></>, txt = "", active = true, open = false, onClick = () => {}, dropdownItems = []}) {
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
                className="border-2 bg-secondary hover:bg-green-600 text-white w-auto h-10 py-6 px-2 rounded-md font-poppins font-bold flex items-center mx-4"
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
                <div className="mt-2 bg-white shadow-lg rounded-lg">
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

export default DropdownBtn;
