import { Tr, Td, Tt } from "../../../../../../Components/Table";
import { TbUserEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../Components/Modals/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Modal from "../../../../../../Components/Modals/BasicModal";
// import DeleteExam from "../../DeleteExam";
import useaxios from "../../../../../../Hooks/useAxios";

function Rows({
  id = "",
  name = "",
  description = "",
  start_date = "",
  grading_status = "",
  fetchData,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const request = useaxios();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await request({
        method: "DELETE",
        url: "exams",
        params: { id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response !== "error") {
        fetchData();
        setShowDeleteModal(false);
        toast.success("Deleted successfully");
      } else {
        throw new Error(`Failed to delete item with ID ${id}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Tr>
      <Td name="EXAM NAME">
        <Tt txt={name} />
      </Td>
      <Td name="DESCRIPTION">
        <Tt txt={description} />
      </Td>
      <Td name="DATE">
        <Tt txt={start_date} />
      </Td>
      <Td name="GRADING STATUS">
        <Tt txt={grading_status} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-5  items-center text-4xl">
          <span
            className=" cursor-pointer active:opacity-50 text-yellow-600 text-3xl"
            onClick={() => navigate(`/dashboard/exam/edit/${id}`)}
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
      <div>
        <ConfirmationModal
          text="ARE YOU SURE YOU WANT TO DELETE?"
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onCancelClick={() => setShowDeleteModal(false)}
          onConfirmClick={() => handleDelete(id)}
          confirmText="Delete"
          cancelText="Cancel"
        />
        <ToastContainer />
      </div>
    </Tr>
  );
}

export default Rows;
