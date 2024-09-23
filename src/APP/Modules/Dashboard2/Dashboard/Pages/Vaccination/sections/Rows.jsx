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

function Rows({ id = "", child="", booster = "", pandemic = "", other="", travel="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()

  const request  = useaxios();


  async function handleDelete() {
    try {
      const res = await request({
        method: "DELETE",
        url: "c",
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
      <Td name="Booster Vaccine">
        <Tt txt={booster} />
      </Td>
      <Td txt="Childhood Vaccine">
      <Tt txt={child} />
      </Td>
      <Td name="Other Vaccine">
        <Tt txt={other} />
      </Td>
      <Td name="Pandemic Vaccine">
        <Tt txt={pandemic} />
      </Td>
      <Td name="Travel Vaccine">
        <Tt txt={travel} />
      </Td>
      {/* <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
           <button className="w-full py-3 px-5 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">Order Drug</button>
          </span>
        </span>
      </Td> */}
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