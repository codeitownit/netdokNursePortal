import React, { useEffect, useState} from "react";
import useaxios from "../../../../../Hooks/useAxios";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";

function SelectParent({ singleParent, setSingleParent, allParents, setAllParents, setShowModal }){
    const request = useaxios()
    const [parents, setParents] = useState([])
    const [search, setSearch] = useState("")
    
    useEffect(
      () => {
        async function fetchParents(){
          try{
            const res = await request({
              method: "GET",
              url: "parents",
              auth: false,
              showLoader: false
            });

            if(res !== "error") {
              setParents(res.data)
            }
          } catch (error){
            console.error("Could not fetch parents", error)
          }
        } fetchParents();
      }, []
    )

    function handleClick(object){
      setSingleParent({...singleParent, name: object.name, email: object.email, password: object.password, gender: object.gender_id, phone: object.phone, address: object.address});
    }

    function handleSubmit(){
      setAllParents([...allParents, singleParent]);
      setShowModal(false);
    }

    return(
       <div className=" m-20">
        <div className="flex flex-col h-48 items-center justify-center">
          <input placeholder="Search parents" className=" rounded border border-black p-3" value={search} onChange={(e) => setSearch(e.target.value)} /><br></br>
          { search && (
            <ul> 
            {parents.filter((parent) => {
              return search.toLowerCase() === "" ? parent : parent.name.toLowerCase().includes(search) 
             }) 
             .map((parent) => (
               <li value={parent.id} className="p-1" key={parent?.id} onClick={() => handleClick(parent)}>{parent.name}</li>
             ))
            }
           </ul>
          )
          } 
        </div>
        <div className="flex justify-center">
          <AddEdit text="Submit" onClick={handleSubmit} />
        </div>
       </div>
    )
}

export default SelectParent;