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
import { db } from "../../../../../../../../firebaseConfig";
import {doc, updateDoc } from "firebase/firestore"; // Import Firestore

function Rows({ key="", id="", date = "", docId="", urgency="", samples = "", tests = "", duedate="", status="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()

  const updateLabStatus = async () => {
    try {
      const labRef = doc(db, "lab_requests", docId); // Reference to the specific document
      await updateDoc(labRef, {
        labStatus: "done", // Update the unRead status to false
      });
      console.log("Lab status updated successfully.");
    } catch (error) {
      console.error("Error updating lab status: ", error);
    }
    // navigate("/dashboard")
  };

  // async function handleDelete() {
  //   try {
  //     const res = await request({
  //       method: "DELETE",
  //       url: "c",
  //       data: {},
  //       params:{
  //         id: id
  //       },
  //       auth: false, 
  //       showLoader: false
  //     });

  //     // Check if the response is not an error
  //     if (res !== "error") {
  //       navigate(`/dashboard/c`)
  //       setShowDeleteModal(false);
  //       toast.success("Deleted successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }


  return (
    <>
      <Tr>
      {/* <Td name="PATIENT ID">
        <Tt txt={`#${key}`} />
      </Td> */}
      <Td name="DATE REQUESTED">
        <Tt txt={`${date}`} />
      </Td>
      <Td name="URGENCY">
        <Tt txt={urgency} />
      </Td>
      <Td name="SAMPLES TAKEN">
        <Tt txt={samples} />
      </Td>
      <Td name="TESTS REQUESTED">
        <Tt txt={tests} />
      </Td>
      <Td name="DUE DATE">
        <Tt txt={duedate} />
      </Td>
      <Td name="STATUS">
        <Tt txt={status} />
      </Td>
      {/* <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
        <button className="w-full py-3 px-5 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all" onClick={()=>updateLabStatus()}>Done</button>
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
            <MdDelete />
          </span>
          <span className=" cursor-pointer active:opacity-50 text-blue-500 text-3xl" onClick={()=>navigate(`/dashboard/edit/${id}`)}>
            <FaEdit/>
          </span>
        </span>
      </Td> */}
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