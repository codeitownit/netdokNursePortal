import { useState } from 'react';

function DropdownBtnTemplate({ 
    Icon = <></>, 
    txt = "", 
    active = true, 
    open = false, 
    onClick = () => {}, 
    dropdownItems = [] 
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(open);

    const handleButtonClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
        onClick();
    };

    return (
        <div className="relative">
            <div 
                className={`w-full flex items-center gap-x-2 cursor-pointer active:opacity-50 ${isDropdownOpen ? 'rounded-2xl px-1 py-1' : ''}`}
                style={{
                    backgroundColor: active && isDropdownOpen ? '#a3cc9c' : 'transparent',
                }}
                onClick={handleButtonClick}
            >
                <span className={`text-2xl ${active ? 'text-black' : 'text-white'} p-2 ${active ? 'bg-secondary' : 'bg-primary'} rounded-full`}>
                    {Icon}
                </span>
                {isDropdownOpen && <span className="font-bold text-xl">{txt}</span>}
            </div>

            {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                    <ul className="flex flex-col">
                        {dropdownItems.map((item, index) => (
                            <li 
                                key={index} 
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={item.onClick}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DropdownBtnTemplate;
