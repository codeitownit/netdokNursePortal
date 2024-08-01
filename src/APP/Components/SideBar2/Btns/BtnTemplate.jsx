
function BtnTemplate({Icon=<></>,txt="",active=true,open=false,onClick=()=>{}}){

   

    return <div className={`*
    w-full flex items-center gap-x-2  cursor-pointer active:opacity-50 ${open ? ' rounded-2xl px-1 py-1':''}
    `}
     style={{
    backgroundColor:active && open?'#a3cc9c':'transparent',
     }}
     onClick={onClick}
    >
        <span className={` text-2xl ${active?'text-black':'text-white'} p-2 ${active?'bg-secondary':'bg-primary'} rounded-full`}>{Icon}</span>
        {open && <span className=" font-bold text-xl ">{txt}</span>}
    </div>
}


export default BtnTemplate