/* eslint-disable react/prop-types */

import ABtn from "../ABtn";

import { FaEye } from "react-icons/fa";

const ViewABtn = ({ txt = "View", onClick = () => {} }) => {
  return (
    <ABtn txt={txt} onClick={onClick}>
      <FaEye />
    </ABtn>
  );
};

export default ViewABtn;
