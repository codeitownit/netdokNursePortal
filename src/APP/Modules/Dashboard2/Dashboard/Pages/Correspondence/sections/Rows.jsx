/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../Components/Table";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useaxios from "../../../../../../Hooks/useAxios";
import ConfirmationModal from "../../../../../../Components/Modals/ConfirmationModal";
import { doctorId } from "../../../../../../Components/globals";

function Rows({ date = "", type="", docId="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()
  const patientId = localStorage.getItem("universalPatientId")

  const request  = useaxios();
  function viewJournal() {
    if(type === "Correspondence"){
      navigate(`/viewPatient/${patientId}/correspondence/view/correspondenceJournal/${docId}`)
    } else if(type === "Death Certificate"){
      navigate(`/viewPatient/${patientId}/correspondence/view/deathCertificate/${docId}`)
    } else if(type === "Medical Certificate Life Birth"){
      navigate(`/viewPatient/${patientId}/correspondence/view/medLiveBirth/${docId}`)
    } else if(type === "Medical Fitness Certificate"){
      navigate(`/viewPatient/${patientId}/correspondence/view/medFitness/${docId}`)
    }  else if(type === "Medical Leave Certificate"){
      navigate(`/viewPatient/${patientId}/correspondence/view/medLeave/${docId}`)
    } 
  }
  return (
    <>
      <Tr>
      <Td name="DATE">
        <Tt txt={date} />
      </Td>
      <Td name="TYPE">
        <Tt txt={type} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
        <button className="w-full py-3 px-5 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all" onClick={()=>viewJournal()}>View</button>
        </span>
      </Td>
    </Tr>
</>
  );
}

export default Rows;