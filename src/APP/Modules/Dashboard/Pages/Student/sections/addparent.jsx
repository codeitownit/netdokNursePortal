import React from "react";
import { TextInput, SelectInput } from "../../../../../Components/Inputs";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";

function AddParent({ singleParent, setSingleParent, allParents, setAllParents, setShowModal }){
    
    function handleAddParent(){
      setAllParents([...allParents, singleParent]);
      setShowModal(false);
    }
    
    return(
        <div className=" p-20 border-gray-900">
          <div className=" w-full ">
           <div className="flex h-20 ">
            <TextInput directInput="true" transform="false" label="Full name" stateInput={singleParent.name} setStateInput={(value) => setSingleParent({...singleParent, name : value})} />
            <TextInput directInput="true" transform="false" label="Email" stateInput={singleParent.email} setStateInput={(value) => setSingleParent({...singleParent, email : value})} />
           </div>
           <div className="flex h-20">
            <TextInput label="Password" directInput="true" stateInput={singleParent.password} setStateInput={(value) => setSingleParent({...singleParent, password : value})} />
            <SelectInput label="Gender" directInput="true" stateInput={singleParent.gender} setStateInput={(value) => setSingleParent({...singleParent, gender : value})}>
                <option disabled hidden></option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
            </SelectInput>
           </div>
           <div className="flex h-20">
            <TextInput label="Phone Number" directInput="true" stateInput={singleParent.phone} setStateInput={(value) => setSingleParent({...singleParent, phone : value})} />
            <TextInput label="Address" directInput="true" stateInput={singleParent.address} setStateInput={(value) => setSingleParent({...singleParent, address : value})} />
           </div>
          </div> 
          <div className="flex justify-center">
            <AddEdit text="Submit" onClick={handleAddParent} />
          </div>
        </div> 
    )
}

export default AddParent;