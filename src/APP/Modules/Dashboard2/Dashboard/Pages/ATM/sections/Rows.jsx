/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../Components/Table";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useaxios from "../../../../../../Hooks/useAxios";
import ConfirmModal from "../../../../../../Components/Modals/ConfirmModal";

function Rows({ id = "", medname="", type = "", indication = "", dose="", date="", docId="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [ time, setTime] = useState("")
  const [ administeredDose, setAdministeredDose] = useState("")

  const navigate = useNavigate()
// const time = new Date()
  const request  = useaxios();
  const patientId = localStorage.getItem("universalPatientId");


  async function handleDelete() {
    console.log(medname)
    try {
      const res = await request({
        method: "POST",
        url: "administerDrug",
        data: {
          patientId: patientId,
          formerId: docId,
          dose: dose,
          precription: medname, 
          administeredDose: administeredDose,
          time: time,
          date: new Date().toLocaleDateString(),
          timestamp: new Date()
        },
        auth: false, 
        showLoader: false
      });

      // Check if the response is not an error
      if (res !== "error") {
        setShowDeleteModal(false);
        toast.success("Added successfully");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <>
      <Tr>
      <Td name="MEDICINE NAME">
        <Tt txt={medname} />
      </Td>
      <Td name="ADMINISTRATION">
        <Tt txt={type} />
      </Td>
      <Td name="INDICATION">
        <Tt txt={indication} />
      </Td>
      <Td name="DOSE">
        <Tt txt={dose} />
      </Td>
      <Td name="DATE CREATED">
        <Tt txt={date} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
           <button className="w-full py-3 px-5 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">Administer Drug</button>
          </span>
        </span>
      </Td>
    </Tr>
    <ConfirmModal
    text="DRUG ADMINISTRATION" 
    body1={medname}
    body2={indication}
    body3="Administered type"
    time={time}
    administeredDose={administeredDose}
    setAdministeredDose={setAdministeredDose}
    setTime={setTime}
    showModal={showDeleteModal}
    setShowModal={setShowDeleteModal}
    onCancelClick={()=>setShowDeleteModal(false)}
    onConfirmClick={()=>handleDelete(id)}
    confirmText="Confirm"
    cancelText="Cancel"
    />
    <ToastContainer />
</>
  );
}

export default Rows;