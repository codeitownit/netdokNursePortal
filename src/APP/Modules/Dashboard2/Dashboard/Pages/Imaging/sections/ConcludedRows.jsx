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
import { collection, where, onSnapshot, query, getDocs, addDoc, doc, updateDoc } from "firebase/firestore"; // Import Firestore

function Rows({ key="", id="", docId="", date = "", docu="", exam = "", condition = "", diagnosis="", status="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()
  const queryString = localStorage.getItem("universalPatientId")
  const doctorId = localStorage.getItem("primeDoctorUserId")
  const request  = useaxios();


  // async function handleEdit() {
  //   try {
  //     const res = await request({
  //       method: "PUT",
  //       url: `imaging/imagingRouteWhere/${queryString}/${doctorId}/${docId}`,
  //       data: {
  //         imagingStatus: "done",
  //       },
  //       auth: false
  //     });

  //     // Check if the response is not an error
  //     if (res !== "error") {
  //       console.log(res)
  //       // navigate(`/viewPatient/${queryString}`)
  //       toast.success("Archived successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  const updateImagingStatus = async () => {
    try {
      const notificationRef = doc(db, "imaging", docId); // Reference to the specific document
      await updateDoc(notificationRef, {
        imagingStatus: "done", // Update the unRead status to false
      });
      console.log("Imaging status updated successfully.");
    } catch (error) {
      console.error("Error updating imaging status: ", error);
    }
    // navigate("/dashboard")
  };

  return (
    <>
      <Tr>
      {/* <Td name="PATIENT ID">
        <Tt txt={`#${key}`} />
      </Td> */}
      <Td name="DATE ADDED">
        <Tt txt={`${date}`} />
      </Td>
      <Td name="CLINICIAN">
        <Tt txt={docu} />
      </Td>
      <Td name="EXAMINATIONS REQUESTED">
        <Tt txt={exam} />
      </Td>
      <Td name="CONDITIONS">
        <Tt txt={condition} />
      </Td>
      <Td name="PROVISIONAL DIAGNOSIS">
        <Tt txt={diagnosis} />
      </Td>
      <Td name="STATUS">
        <Tt txt={status} />
      </Td>
      {/* <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
        <button className="w-full py-3 px-5 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all" onClick={()=>updateImagingStatus()}>Done</button>
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
            <MdDelete />
          </span>
           <span className=" cursor-pointer active:opacity-50 text-blue-500 text-3xl" onClick={()=>navigate(`/dashboard/c/edit/${id}`)}>
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