
function LogoutBtnTemplate({Icon=<></>,txt="",active=true,open=false,onClick=()=>{}}){

   

    return <div className={`*
    w-full flex items-center gap-x-2  cursor-pointer active:opacity-50 ${open ? ' rounded-2xl px-1 py-1':''}
    `}
     style={{
    backgroundColor:'transparent',
     }}
     onClick={onClick}
    >
        <span className={` text-2xl ${active?'text-white':'text-black'} p-2 ${active?'bg-secondary':'bg-white'} rounded-full`}>{Icon}</span>
        {open && <span className=" font-bold text-xl ">{txt}</span>}
    </div>
}


export default LogoutBtnTemplate