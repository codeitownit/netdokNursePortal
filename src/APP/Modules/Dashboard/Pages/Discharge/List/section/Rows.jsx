/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../Components/Table";

import { TbEdit } from "react-icons/tb";

import { MdDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import BASE_API from "../../../../../../API/api";
import useaxios from "../../../../../../Hooks/useAxios";

function Rows({ id = "", name = "", code = "" }) {
  const navigate = useNavigate();
  const request = useaxios(BASE_API);

  function handleEdit() {
    //console.log('clicked on the id:', id)
    navigate(`edit/${id}`);
  }

  const handleDelete = async () => {
    //console.log('clicked on the delete of id:', id)
    // i have to add a route to the subject single profile

    try {
      const response = await request({
        method: "DELETE",
        url: "subjects",
        params: { id: id },
      });

      //console.log("Deleted:", response);
    } catch (e) {
      //console.log("Error sending data:", e);
    }
  };
  return (
    <Tr>
      <Td name="ID">
        <Tt txt={`#${id}`} />
      </Td>
      <Td name="NAME">
        <Tt txt={name} />
      </Td>
      <Td name="CODE">
        <Tt txt={code} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-4  items-center text-4xl">
          <span
            className=" cursor-pointer active:opacity-50 text-yellow-600 text-3xl"
            onClick={handleEdit}
          >
            <TbEdit />
          </span>
          <span
            className=" cursor-pointer active:opacity-50 bg-red"
            style={{ color: "red" }}
            onClick={handleDelete}
          >
            <MdDelete />
          </span>
        </span>
      </Td>
    </Tr>
  );
}

export default Rows;
