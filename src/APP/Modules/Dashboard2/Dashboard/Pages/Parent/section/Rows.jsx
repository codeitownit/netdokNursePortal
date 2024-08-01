/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../Components/Table";
import { TbUserEdit } from "react-icons/tb";
import { FaRegComments } from "react-icons/fa";

function Rows({ id = "", exam_name = "", student_name = "", start_date = "" }) {
  return (
    <Tr>
      <Td name="ID">
        <Tt txt={`#${id}`} />
      </Td>
      <Td name="EXAM NAME">
        <Tt txt={exam_name} />
      </Td>
      <Td name="STUDENT NAME">
        <Tt txt={student_name} />
      </Td>
      <Td name="DATE">
        <Tt txt={start_date} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-4  items-center text-4xl">
          <span className=" cursor-pointer active:opacity-50 text-yellow-600 text-3xl">
            <TbUserEdit />
          </span>
          <span className=" cursor-pointer active:opacity-50 text-black">
            <FaRegComments />
          </span>
        </span>
      </Td>
    </Tr>
  );
}

export default Rows;
