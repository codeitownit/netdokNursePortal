/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

import useValidation from "./useValidation";

const Phone = ({
  input = { phone: "" },
  setInput = () => {},
  stateInput = "",
  setStateInput = () => {},
  field = "phone",
  prefix = "+254",
  placeholder = "",
  label = "Phone",
  showLabel = true,
  validate = 0,
  setValidation = () => {},
  disabled = false,
  required = true,
  errorMessage = "Invalid phone number",
  directInput = false,
  blurValidation = true,
  directValidation = true,
  initialValidation = true,
  mt = 0,
  mb = 0,
}) => {
  const [error, setError] = useState(false);

  const { validationError } = useValidation({
    input,
    stateInput,
    field,
    required,
    setValidation,
    directInput,
    blurValidation,
    initialValidation,
    minChar: 8,
  });

  useEffect(() => {
    if (required === false || initialValidation === false) return;
    validationError();
  }, [initialValidation]);

  useEffect(() => {
    if (validate === 0) return;
    validatePhone();
  }, [validate]);

  function validatePhone(no = null) {
    if (required === false) return;

    let testValue = "";

    validationError();

    if (no === null) {
      directInput ? (testValue = stateInput) : (testValue = input[field]);
    } else {
      testValue = no;
    }

    if (testValue.toString().length >= 8) {
      setError(false);
    } else {
      setError(true);
      return;
    }

    setError(false);
  }

  function handleBlur() {
    if (blurValidation) {
      validatePhone();
    }
  }

  function handleChange(txt) {
    if (disabled == true) return;

    if (isNaN(parseInt(txt)) && txt !== "") {
      return;
    }

    if (directInput) {
      setStateInput(txt);
    } else {
      setInput((c) => {
        let newObj = { ...c };
        newObj[field] = txt;
        return newObj;
      });
    }

    if (directValidation || error == true) {
      validatePhone(txt);
    }
  }

  return (
    <Input mt={mt} mb={mb}>
      <InputLabel label={label} showLabel={showLabel} />
      <div
        className="w-full flex gap-x-2 items-center border-2 rounded-lg   py-1 px-4"
        style={{ backgroundColor: "white" }}
      >
        <p className=" px-4 py-1 rounded-md bg-anti-flash-white taupe-gray  ">
          {prefix}
        </p>
        <input
          className={`w-full flex-1`}
          value={directInput ? stateInput : input[field]}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </div>
      <InputError
        input={directInput ? stateInput : input[field]}
        message={errorMessage}
        error={error}
      />
    </Input>
  );
};

export default Phone;
