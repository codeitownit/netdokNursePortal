function BtnTemplate({Icon = <></>, txt = "", active = true, open = false, onClick = () => {}}) {
    return (
        <div 
            className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-slate-700 w-full gap-x-2 transition-all ease-in-out ${
                open ? 'rounded-2xl px-3 py-0.5' : ''
            } ${active && open ? 'bg-green-200' : 'bg-transparent'}`}
            onClick={onClick}
        >
            <span 
                className={`text-2xl ${active ? 'text-green-500' : 'text-gray-500'} p-2 hover:text-green-500`}
            >
                {Icon}
            </span>
            {open && (
                <span className="text-lg transition-opacity duration-300 ease-in-out opacity-100 hover:text-green-500">
                    {txt}
                </span>
            )}
        </div>
    );
}

export default BtnTemplate;
