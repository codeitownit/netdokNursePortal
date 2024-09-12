/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../../Components/Table";


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import useaxios from "../../../../../../Hooks/useAxios";

function Rows({ id = "", name="", date= "", dose = "", condition="", fetchData}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()

  // const request  = useaxios();


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
      <Td name="DATE">
        <Tt txt={date} />
      </Td>
      <Td name="MEDICINE">
        <Tt txt={name} />
      </Td>
      <Td name="DOSE">
        <Tt txt={dose} />
      </Td>
      <Td name="INDICATION">
        <Tt txt={condition} />
      </Td>
    </Tr>
    {/* <ConfirmationModal
    text="ARE YOU SURE YOU WANT TO DELETE?" 
    showModal={showDeleteModal}
    setShowModal={setShowDeleteModal}
    onCancelClick={()=>setShowDeleteModal(false)}
    onConfirmClick={()=>handleDelete(id)}
    confirmText="Delete"
    cancelText="Cancel"
    /> */}
    <ToastContainer />
</>
  );
}

export default Rows;