import React from "react";
import Button from "./Button";

function AddEdit({ text, onClick, type = "" }) {
  return (
    <Button
      clss=" border-2 border-black bg-yellow-500 text-black w-auto h-10 p-2 rounded-full font-poppins font-bold flex items-center mx-4"
      text={text}
      // icon={icon}
      onClick={onClick}
      type={type}
    />
  );
}

export default AddEdit;
