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

function Rows({ id = "", date="", clinician = "", address = "", clinic="", reason="", notes="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()

  const request  = useaxios();


  async function handleDelete() {
    try {
      const res = await request({
        method: "DELETE",
        url: "",
        data: {},
        params:{
          id: id
        },
        auth: false, 
        showLoader: false
      });

      // Check if the response is not an error
      if (res !== "error") {
        navigate(`/dashboard/c`)
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
      <Td name="DATE">
        <Tt txt={date} />
      </Td>
      <Td txt="NAME OF CLINICIAN">
      <Tt txt={clinician} />
      </Td>
      <Td name="CLINIC">
        <Tt txt={clinic} />
      </Td>
      <Td name="ADDRESS">
        <Tt txt={address} />
      </Td>
      <Td name="REASONS FOR REFERRAL">
        <Tt txt={reason} />
      </Td>
      <Td name="CLINICAL NOTES">
        <Tt txt={notes} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
            <MdDelete />
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