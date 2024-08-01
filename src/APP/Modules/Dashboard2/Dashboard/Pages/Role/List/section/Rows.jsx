/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "./../../../../../../Components/Table";
import { FaUsers, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../../../../../../Components/Modals/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useaxios from "../../../../../../Hooks/useAxios";

function Rows({ id = "", name = "", description = "", users = "", fetchData }) {
  const request = useaxios();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await request({
        method: "DELETE",
        url: "role",
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

  const handleEdit = () => {
    navigate(`/dashboard/role/edit/${id}`);
  };

  function capitalizeFirstLetterOfRole(input) {
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <Tr>
      <Td name="ID">
        <Tt txt={`#${id}`} />
      </Td>
      <Td name="NAME">
        <Tt txt={capitalizeFirstLetterOfRole(name)} />
      </Td>
      <Td name="DESCRIPTION">
        <Tt txt={description} />
      </Td>
      <Td name="USERS">
        <span className="flex gap-x-2 items-center text-3xl">
          <FaUsers style={{ color: "#0E2F59" }} />
          <span className="text-black font-bold">{users}</span>
        </span>
      </Td>
      <Td name="ACTIONS">
        <span className="flex gap-x-2 items-center text-4xl">
          <span className="cursor-pointer hover:text-[#EEAD49] active:opacity-50 text-blue-500 text-3xl">
            <FaEdit onClick={handleEdit} style={{ color: "#0E2F59" }} />
          </span>
          <span className="cursor-pointer active:opacity-50 text-red-500">
            <RiDeleteBin5Line onClick={() => setShowDeleteModal(true)} />
          </span>
        </span>
      </Td>
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
    </Tr>
  );
}

export default Rows;
