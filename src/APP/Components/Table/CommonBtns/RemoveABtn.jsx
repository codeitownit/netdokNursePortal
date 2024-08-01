/* eslint-disable react/prop-types */

import ABtn from "../ABtn";

import { FaTrash } from "react-icons/fa";

const RemoveABtn = ({ txt = "Remove", onClick = () => {} }) => {
  return (
    <ABtn txt={txt} onClick={onClick}>
      <span className=" text-red-700">
        <FaTrash />
      </span>
    </ABtn>
  );
};

export default RemoveABtn;
