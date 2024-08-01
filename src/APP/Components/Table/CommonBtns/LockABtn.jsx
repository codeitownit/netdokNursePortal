/* eslint-disable react/prop-types */

import ABtn from "../ABtn";
import { BsShieldLockFill } from "react-icons/bs";

const EditABtn = ({ txt = "Permission", onClick = () => {} }) => {
  return (
    <ABtn txt={txt} onClick={onClick}>
      <BsShieldLockFill />
    </ABtn>
  );
};

export default EditABtn;
