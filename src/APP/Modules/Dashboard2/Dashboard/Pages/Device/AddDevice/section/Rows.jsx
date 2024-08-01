/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../Components/Table";

import { FaUsers, FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

function Rows({ deviceId = "", location = "" }) {
  return (
    <Tr>
      <Td name="ID">
        <Tt txt={`#${deviceId}`} />
      </Td>
      <Td name="Location">
        <Tt txt={location} />
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

export default Rows;
