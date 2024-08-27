/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../Components/Table";


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ConfirmationModal from "../../../../../../Components/Modals/ConfirmationModal";
import { db } from "../../../../../../../../firebaseConfig";
import {doc, updateDoc } from "firebase/firestore"; // Import Firestore

function Rows({ id = "", status="", date="", docId="", clinician = "", address = "", clinic="", reason="", notes="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()

//   const updateReferralStatus = async () => {
//     try {
//       const referralRef = doc(db, "referral", docId); // Reference to the specific document
//       await updateDoc(referralRef, {
//         referralStatus: "done", // Update the unRead status to false
//       });
//       console.log("referral status updated successfully.");
//     } catch (error) {
//       console.error("Error updating referral status: ", error);
//     }
//     // navigate("/dashboard")
//   };

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
      <Td name="STATUS">
        <Tt txt={status} />
      </Td>
      {/* <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
        <button className="w-full py-3 px-5 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all" onClick={()=>updateReferralStatus()}>Done</button>
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
            <MdDelete />
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