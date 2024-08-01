import { Tr, Td, Tt } from "../../../../../../../Components/Table";
import { TbUserEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../../../../Components/Modals/BasicModal";
import DeleteGS from "../../DeleteGS";

function Rows({ id = "", name = "", subject = "", ranges = "[]" }) {
  //console.log("Ranges:", ranges);
  const parsedRanges = Array.isArray(ranges) ? ranges[0] || {} : {};
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Tr>
        <Td name="#">
          <Tt txt={id} />
        </Td>
        <Td name="NAME">
          <Tt txt={name} />
        </Td>
        <Td name="SUBJECT">
          <Tt txt={subject} />
        </Td>
        <Td name="GRADE">
          <Tt txt={ranges.length > 0 ? ranges[0].grade : ""} />
        </Td>
        <Td name="MIN">
          <Tt txt={ranges.length > 0 ? ranges[0].min_mark : ""} />
        </Td>
        <Td name="MAX">
          <Tt txt={ranges.length > 0 ? ranges[0].max_mark : ""} />
        </Td>
        <Td name="ACTIONS">
          <span className=" flex gap-x-5  items-center text-4xl">
            <span
              className=" cursor-pointer active:opacity-50 text-yellow-600 text-3xl"
              onClick={() => navigate(`/dashboard/exam/editGrade/${id}`)}
            >
              <TbUserEdit />
            </span>
            <span
              className=" cursor-pointer active:opacity-50 text-red-700"
              onClick={() => setShowDeleteModal(true)}
            >
              <MdDelete />
            </span>
          </span>
        </Td>
      </Tr>
      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <DeleteGS />
      </Modal>
    </>
  );
}

export default Rows;
