import React from 'react';
import { Tr, Td, Tt } from "../../../../../../Components/Table";
import { FaUsers, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Rows3({ id, name, email, phone, gender, role, isActive, created, handleDeleteClick }) {
  const navigate = useNavigate();

  return (
    <>
      <Tr>
        <Td name="NAME"><Tt txt={name} /></Td>
        <Td name="GENDER">
          <span className="flex gap-x-2 items-center text-3xl">
            <FaUsers />
            <span className="text-black font-bold">{gender}</span>
          </span>
        </Td>
        <Td name="EMAIL"><Tt txt={email} /></Td>
        <Td name="PHONE NO"><Tt txt={phone} /></Td>
        <Td name="ROLE"><Tt txt={role} /></Td>
        <Td name="ACTIVE"><Tt txt={isActive ? 'Yes' : 'No'} /></Td>
        <Td name="CREATED AT"><Tt txt={created} /></Td>
        <Td name="ACTIONS">
          <span className="flex gap-x-2 items-center text-4xl">
            <span className="cursor-pointer active:opacity-50 text-red-500" onClick={() => handleDeleteClick({ id, name, role, phone })}>
              <MdDelete />
            </span>
            <span className="cursor-pointer active:opacity-50 text-blue-500 text-3xl" onClick={() => navigate(`/dashboard/member/edit/${id}`)}>
              <FaEdit />
            </span>
          </span>
        </Td>
      </Tr>
    </>
  );
}

export default Rows3;
