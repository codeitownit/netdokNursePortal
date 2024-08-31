
function LogoutBtnTemplate({Icon=<></>,txt="",active=true,open=false,onClick=()=>{}}){

   

    return <div className={`*
    w-full flex items-center gap-x-2  cursor-pointer active:opacity-50 ${open ? ' px-1 py-1':''}
    `}
     style={{
    backgroundColor:open?'#D9D9D9':'transparent',
     }}
     onClick={onClick}
    >
        <span className={` text-2xl ${active?'text-green-500':'text-gray-500'} p-2 ${active?'bg-primary':'bg-white'}`}>{Icon}</span>
        {open && <span className="text-lg">{txt}</span>}
    </div>
}


export default LogoutBtnTemplate