/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../Components/Table";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../../Components/Modals/BasicModal";
import DeleteDeviceModal from "../DeleteDevice";



function Rows({ id = "", classLevel="", subject = "", classTeacher = ""}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <Tr>
      <Td name="ID">
        <Tt txt={`#${id}`} />
      </Td>
      <Td name="CLASSLEVEL">
        <Tt txt={classLevel} />
      </Td>
      <Td name="NAME">
        <Tt txt={subject} />
      </Td>
      <Td name="CLASSTEACHER">
        <Tt txt={classTeacher} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
            <MdDelete />
          </span>
          <span className=" cursor-pointer active:opacity-50 text-blue-500 text-3xl" onClick={()=>navigate(`/dashboard/classes/edit/${id}`)}>
            <FaEdit />
          </span>
          <span className=" cursor-pointer active:opacity-50 text-orange-500" onClick={()=>navigate(`/dashboard/classes/attendance/${id}`)}>
            <BsPersonFillCheck />
          </span>
        </span>
      </Td>
    </Tr>
    <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
                <DeleteClass />
            </Modal>
    </>

  );
}

export default Rows;
