/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../../Components/Table";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useaxios from "../../../../../../../Hooks/useAxios";
import ConfirmationModal from "../../../../../../../Components/Modals/ConfirmationModal";
import { patientId } from "../../../../../../../Components/globals";


function Rows({ id = "", docId="", date="", weight = "", height = "", condition="", specialist="", status="", fetchData}) {
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
        navigate(`/dashboard/classes`)
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
      {/* <Td name="PATIENT ID">
        <Tt txt={`#${id}`} />
      </Td> */}
      <Td name="DATE">
        <Tt txt={date} />
      </Td>
      <Td name="WEIGHT">
        <Tt txt={weight} />
      </Td>
      <Td name="HEIGHT">
        <Tt txt={height} />
      </Td>
      <Td name="CURRENT STATE">
        <Tt txt={condition} />
      </Td>
      <Td name="NUTRITIONAL STATE">
        <Tt txt={status} />
      </Td>
      <Td name="RESPONSIBLE SPECIALIST">
        <Tt txt={specialist} />
      </Td>
      
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
            <MdDelete />
          </span>
          <span className=" cursor-pointer active:opacity-50 text-blue-500 text-3xl" onClick={()=>navigate(`/viewPatient/${patientId}/nurseReports/edit/${docId}`)}>
            <FaEdit/>
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