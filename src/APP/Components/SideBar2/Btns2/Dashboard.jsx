
import { useState,useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";

import BtnTemplate from "./BtnTemplate";

import { TiHome } from "react-icons/ti";


function Dashboard({open=false}){
    const location=useLocation()
    const navigate = useNavigate()
    const[active,setActive]=useState(false)


    useEffect(()=>{
        if(location?.pathname==="/dashboard"){
            setActive(true)
            return
        }
        setActive(false)
    },[location])



     return <BtnTemplate active={active} onClick={()=>navigate("/dashboard")} Icon={<TiHome/>}  txt="Home" open={open}/>
}

export default Dashboard