function BtnTemplate({Icon = <></>, txt = "", active = true, open = false, onClick = () => {}}) {
    return (
        <div 
            className={`w-full flex items-center gap-x-2 cursor-pointer transition-all duration-300 ease-in-out ${
                open ? 'rounded-2xl px-3 py-2' : ''
            } ${active && open ? 'bg-green-200' : 'bg-transparent hover:bg-secondary/20'}`}
            onClick={onClick}
        >
            <span 
                className={`text-2xl ${active ? 'text-black' : 'text-white'} p-2 ${
                    active ? 'bg-secondary' : 'bg-primary'
                } rounded-full transition-all duration-300 ease-in-out`}
            >
                {Icon}
            </span>
            {open && (
                <span className="font-bold text-xl transition-opacity duration-300 ease-in-out opacity-100">
                    {txt}
                </span>
            )}
        </div>
    );
}

export default BtnTemplate;
