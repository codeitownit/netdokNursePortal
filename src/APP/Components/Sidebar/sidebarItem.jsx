
// eslint-disable-next-line react/prop-types


import { useNavigate,useLocation } from "react-router-dom"

function SidebarItem({name="", icon=<></>, open=false}) {

  const location=useLocation()
  
  return (
    <div className="h-[38px] -mr-[2px] relative w-[182px]">
              <div className="bg-[#d9d9d9] hover:bg-white cursor-pointer rounded-full h-[38px] relative w-[180px]">
                <div className="text-[#000000] font-[Quicksand,_Helvetica] text-[20px] font-bold left-[53px] tracking-[0] leading-[normal] absolute top-[7px]">{name}</div>
                <div className="bg-[#eead49] rounded-full h-[30px] left-[5px] absolute top-[4px] w-[30px]">
                    <span id="roles-icon" className="h-[18px] left-[6px] absolute top-[8px] w-[18px]">{icon}</span>
                </div>
              </div>
            </div>
  )
}

export default SidebarItem