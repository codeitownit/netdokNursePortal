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

function Rows({ id = "", type="", date="", subject = "", room = "", condition="", specialist="", status="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()
  const patientId = localStorage.getItem("universalPatientId")


  function viewJournal() {
    if(type === "Doctor"){
      navigate(`/viewPatient/${patientId}/contact/patient`)
    } else if(type === "nurseMidwives"){
      navigate(`/viewPatient/${patientId}/contact/nurse/${id}`)
    } else if(type === "nurseMidwivesOperation"){
      navigate(`/viewPatient/${patientId}/contact/nurseOperation/${id}`)
    } else if(type === "nurseMidwivesProgress"){
      navigate(`/viewPatient/${patientId}/contact/nurseProgress/${id}`)
    } else if(type === "nurseMidwivesTelephone"){
      navigate(`/viewPatient/${patientId}/contact/nurseTelephone/${id}`)
    }  else if(type === "physiotherapy"){
      navigate(`/viewPatient/${patientId}/contact/physiotherapy/${id}`)
    } else if(type === "physiotherapyConsultation"){
      navigate(`/viewPatient/${patientId}/contact/physiotherapyConsultation/${id}`)
    }else if(type === "physiotherapyTelephone"){
      navigate(`/viewPatient/${patientId}/contact/physiotherapyTelephone/${id}`)
    } else if(type === "physiotherapyProgress"){
      navigate(`/viewPatient/${patientId}/contact/physiotherapyProgress/${id}`)
    } else if(type === "occupationalTherapy"){
      navigate(`/viewPatient/${patientId}/contact/occupational/${id}`)
    } else if(type === "occupationalTherapyProgress"){
      navigate(`/viewPatient/${patientId}/contact/occupationalProgress/${id}`)
    } else if(type === "occupationalTherapyTelephone"){
      navigate(`/viewPatient/${patientId}/contact/occupationalTelephone/${id}`)
    } else if(type === "psychology"){
      navigate(`/viewPatient/${patientId}/contact/psychology/${id}`)
    } else if(type === "psychologyTelephone"){
      navigate(`/viewPatient/${patientId}/contact/psychologyTelephone/${id}`)
    } else if(type === "psychologyProgress"){
      navigate(`/viewPatient/${patientId}/contact/psychologyProgress/${id}`)
    }else if(type === "psychologyConsultation"){
      navigate(`/viewPatient/${patientId}/contact/psychologyConsultation/${id}`)
    } else if(type === "pediatric-growth"){
      navigate(`/viewPatient/${patientId}/contact/pediatric/${id}`)
    } else if(type === "pediatric-growthTelephone"){
      navigate(`/viewPatient/${patientId}/contact/pediatricTelephone/${id}`)
    } else if(type === "pediatric-growthProgress"){
      navigate(`/viewPatient/${patientId}/contact/pediatricProgress/${id}`)
    }  else if(type === "discharge"){
      navigate(`/viewPatient/${patientId}/contact/discharge/${id}`)
    } else if(type === "progress"){
      navigate(`/viewPatient/${patientId}/contact/progress/${id}`)
    } else if(type === "telephone"){
      navigate(`/viewPatient/${patientId}/contact/telephone/${id}`)
    } else if(type === "operation"){
      navigate(`/viewPatient/${patientId}/contact/operation/${id}`)
    } else if(type === "patient"){
      navigate(`/viewPatient/${patientId}/contact/patient/${id}`)
    } else if(type === "admission"){
      navigate(`/viewPatient/${patientId}/contact/admission/${id}`)
    }
  }


  return (
    <>
      <Tr>
      {/* <Td name="PATIENT ID">
        <Tt txt={`#${id}`} />
      </Td> */}
      <Td name="DATE OF CONTACT">
        <Tt txt={date} />
      </Td>
      <Td name="TYPE OF SPECIALIST">
        <Tt txt={specialist} />
      </Td>
      <Td name="TYPE">
        <Tt txt={type} />
      </Td>
      <Td name="CONDITION">
        <Tt txt={condition} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
        <button className="w-full py-3 px-5 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all" onClick={()=>viewJournal()}>View</button>
        </span>
      </Td>
    </Tr>
    <ConfirmationModal
    text="ARE YOU SURE YOU WANT TO DELETE?" 
    showModal={showDeleteModal}
    setShowModal={setShowDeleteModal}
    onCancelClick={()=>setShowDeleteModal(false)}
    // onConfirmClick={()=>handleDelete(id)}
    confirmText="Delete"
    cancelText="Cancel"
    />
    <ToastContainer />
</>
  );
}

export default Rows;