/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../Components/Table";

import { FaUsers, FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../../Components/Modals/BasicModal";
import DeleteStudent from "../DeleteStudent";

function Rows2({ id = "", adm = "", name = "", level = "", gender = "", students = "", setStudents = "" }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()

  return (
  <>
    <Tr>
      <Td name="ADMISSION">
        <Tt txt={adm} />
      </Td>
      <Td name="NAME">
        <Tt txt={name} />
      </Td>
      <Td name="LEVEL">
        <Tt txt={level} />
      </Td>
      <Td name="GENDER">
        <span className=" flex gap-x-2 items-center text-3xl ">
          <FaUsers />
          <span className=" text-black font-bold">{gender}</span>
        </span>
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
          <span className=" cursor-pointer active:opacity-50 text-red-500" onClick={()=>setShowDeleteModal(true)}>
            <MdDelete />
          </span>
          <span className=" cursor-pointer active:opacity-50 text-blue-500 text-3xl" onClick={()=>navigate(`/dashboard/students/edit/${id}`)}>
            <FaEdit />
          </span>
          <span className=" cursor-pointer active:opacity-50 text-yellow-500 text-3xl" onClick={()=>navigate(`/dashboard/students/profile/${id}`)}>
            <FaRegEye />
          </span>
        </span>
      </Td>
    </Tr>
    <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
      <DeleteStudent id={id} students={students} setStudents={setStudents} />
    </Modal>
  </>
  );
}

export default Rows2;
