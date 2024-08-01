/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../Components/Table";

import { FaUsers, FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

function Rows2({ id = "", name = "", level = "", gender = "" }) {
  return (
    <Tr>
      <Td name="ID">
        <Tt txt={`#${id}`} />
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
          <span className=" cursor-pointer active:opacity-50 text-red-500">
            <MdDelete />
          </span>
          <span className=" cursor-pointer active:opacity-50 text-blue-500 text-3xl">
            <FaEdit />
          </span>
        </span>
      </Td>
    </Tr>
  );
}

export default Rows2;