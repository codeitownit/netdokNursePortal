/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

import inputClass from "./input.style";

import useValidation from "./useValidation";

const SelectInput = ({
  input = { phone: "" },
  setInput = () => {},
  stateInput = "",
  setStateInput = () => {},
  field = "textInput",
  label = "Select Input",
  showLabel = true,
  validate = 0,
  setValidation = () => {},
  disabled = false,
  required = true,
  errorMessage = "Select Option",
  directInput = false,
  blurValidation = true,
  directValidation = true,
  initialValidation = true,
  mt = 0,
  mb = 0,
  ex = "",
  children,
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (validate === 0) return;

    validateInput();
  }, [validate]);

  function validateInput() {
    if (required === false) return;

    let testValue = "";
    //validationError();

    directInput ? (testValue = stateInput) : (testValue = input[field]);

    if (testValue === "" || !testValue) {
      setError(true);
      return;
    }
    setError(false);
    return;
  }

  function handleBlur() {
    if (blurValidation) {
      validateInput();
    }
  }

  function handleChange(txt) {
    if (disabled == true) return;

    if (directInput) {
      setStateInput(txt);
    } else {
      setInput((c) => {
        const newObj = { ...c };
        newObj[field] = txt;
        return newObj;
      });
    }

    if (directValidation || error == true) {
      validateInput();
    }
  }

  return (
    <Input mt={mt} mb={mb}>
      <InputLabel label={label} showLabel={showLabel} />
      <select
        className={`${
          error ? inputClass.error : inputClass.base
        } w-full text-gray-2 bg-transparent outline-none cursor-pointer bg-white ${ex}`}
        value={directInput ? stateInput : input[field]}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
      >
        {children}
      </select>
      <InputError
        input={directInput ? stateInput : input[field]}
        message={errorMessage}
        error={error}
      />
    </Input>
  );
};

export default SelectInput;
