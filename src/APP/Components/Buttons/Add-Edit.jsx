import React from "react";
import Button from "./Button";

function AddEdit({ text, onClick, type = "" }) {
  return (
    <Button
      clss=" border-2 bg-secondary hover:bg-green-600 text-white w-auto h-10 p-6 rounded-md font-poppins font-bold flex items-center mx-4"
      text={text}
      // icon={icon}
      onClick={onClick}
      type={type}
    />
  );
}

export default AddEdit;
