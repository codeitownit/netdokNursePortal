/* eslint-disable react/prop-types */
import { Tr, Td, Tt  } from "../../../../../Components/Table";

import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useaxios from "../../../../../Hooks/useAxios";
import ConfirmationModal from "../../../../../Components/Modals/ConfirmationModal";


function Rows({ id = "", doc="", date="", classLevel="", subject = "", room = "", condition="", specialist="", status="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()

  const request  = useaxios();


  async function handleDelete() {
    try {
      const res = await request({
        method: "DELETE",
        url: "classes",
        data: {},
        params:{
          id: id
        },
        auth: false, 
        showLoader: false
      });

      // Check if the response is not an error
      if (res !== "error") {
        // navigate(`/dashboard/`)
        setShowDeleteModal(false);
        toast.success("Deleted successfully");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <>
      <Tr>
      <Td name="PATIENT ID">
        <Tt txt={`#${id}`} />
      </Td>
      <Td name="PATIENT NAME">
        <Tt txt={classLevel} />
      </Td>
      <Td name="ADMISSION UNIT">
        <Tt txt={subject} />
      </Td>
      <Td name="ADMISSION ROOM">
        <Tt txt={room} />
      </Td>
      <Td name="CONDITION INFORMATION">
        <Tt txt={condition} />
      </Td>
      <Td name="RESPONSIBLE SPECIALIST">
        <Tt txt={specialist} />
      </Td>
      <Td name="STATUS">
        <Tt txt={status} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
          {/* <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
            <MdDelete />
          </span> */}
          <span className=" cursor-pointer active:opacity-50 text-blue-500 text-3xl" onClick={()=>{
            navigate(`/viewPatient/${id}`)
            console.log("doc",doc)
            localStorage.setItem("universalPatientId", id)
            localStorage.setItem("universalPatientName", classLevel)
            localStorage.setItem("universalPatientDocumentId", doc)
            localStorage.setItem("universalPatientAdmissionDate", date)

            }}>
            <FaEye/>
          </span>
        </span>
      </Td>
    </Tr>
    <ConfirmationModal
    text="ARE YOU SURE YOU WANT TO DELETE?" 
    showModal={showDeleteModal}
    setShowModal={setShowDeleteModal}
    onCancelClick={()=>setShowDeleteModal(false)}
    onConfirmClick={()=>handleDelete(id)}
    confirmText="Delete"
    cancelText="Cancel"
    />
    <ToastContainer />
</>
  );
}

export default Rows;