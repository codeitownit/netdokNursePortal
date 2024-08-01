/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

import Input from "./Input";

import InputLabel from "./InputLabel";

import InputError from "./InputError";

const FileInput = ({
  file = null,
  setFile = () => {},
  accept = ".csv",
  label = "File Input",
  showLabel = true,
  placeholder = "Select File",
  disabled = false,
  required = true,
  validate = 0,
  mt = 0,
  mb = 0,
  errorMessage = "*Select File",
}) => {
  const [error, setError] = useState(false);

  const btnRef = useRef();

  useEffect(() => {
    if (validate === 0) return;
    if (!file && required === true) {
      setError(true);
    }
  }, [validate]);

  function handleSelectFile(e) {
    if (disabled) return;
    let selectedFile = e?.target?.files[0] || null;
    setFile(selectedFile);
  }

  return (
    <div
      className=" w-full cursor-pointer active:opacity-50"
      style={{ marginTop: mt, marginBottom: mb }}
      onClick={() => btnRef.current.click()}
    >
      <Input>
        <InputLabel label={label} showLabel={showLabel} />
        <div
          className="w-full flex gap-x-2 items-center border-2 rounded-lg   py-1 px-4"
          style={{ backgroundColor: "white" }}
        >
          <p className=" px-4 py-1 rounded-md bg-anti-flash-white taupe-gray  ">
            Select File
          </p>
        </div>
        <InputError input={"file?.name"} message={errorMessage} error={error} />
      </Input>
      <input
        className=" hidden"
        ref={btnRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          handleSelectFile(e);
        }}
      />
    </div>
  );
};

export default FileInput;
