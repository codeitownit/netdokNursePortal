import { Tr, Td, Tt } from "./../../../../../Components/Table";
import { FaEye } from "react-icons/fa";

function TableRow(props) {
  const {
    id,
    student_name,
    class_name,
    stream_name,
    date_time,
    location,
    sn,
    student_id,
  } = props;

  return (
    <Tr>
      <Td name="#">
        <Tt txt={id || ""} />
      </Td>
      <Td name="Student">
        <Tt txt={student_name || ""} />
      </Td>
      <Td name="Class">
        <Tt txt={class_name || ""} />
      </Td>
      <Td name="Stream">
        <Tt txt={stream_name || ""} />
      </Td>
      <Td name="Date">
        <Tt txt={date_time || ""} />
      </Td>
      <Td name="Location">
        <Tt txt={location || ""} />
      </Td>
      <Td name="SN">
        <Tt txt={sn || ""} />
      </Td>
      <Td>
        <div className=" w-full flex justify-center">
          <span className=" text-secondary text-4xl active:opacity-50 cursor-pointer ">
            <FaEye />
          </span>
        </div>
      </Td>
    </Tr>
  );
}

export default TableRow;
