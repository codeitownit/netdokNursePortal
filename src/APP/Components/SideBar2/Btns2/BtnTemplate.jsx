
function BtnTemplate({Icon=<></>,txt="",active=true,open=false,onClick=()=>{}}){

   

    return <div className={`*
    w-full flex items-center active:bg-pink-400 gap-x-2 cursor-pointer ${open ? ' rounded-2xl px-1 py-1':''}
    `}
     style={{
    backgroundColor:open?'white':'transparent',
     }}
     onClick={onClick}
    >
        <span className={` text-2xl ${active?'text-black':'text-white'} p-2 ${active?'bg-secondary':'bg-primary'} rounded-full`}>{Icon}</span>
        {open && <span className=" font-bold text-xl ">{txt}</span>}
    </div>
}


export default BtnTemplate