/* eslint-disable react/prop-types */

import ABtn from "../ABtn";

import { FiEdit } from "react-icons/fi";

const EditABtn = ({ txt = "Edit", onClick = () => {} }) => {
  return (
    <ABtn txt={txt} onClick={onClick}>
      <FiEdit />
    </ABtn>
  );
};

export default EditABtn;
