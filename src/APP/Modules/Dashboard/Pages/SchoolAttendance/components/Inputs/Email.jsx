/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

import inputClass from "./input.style";

import useValidation from "./useValidation";

const Email = ({
  input = { phone: "" },
  setInput = () => {},
  stateInput = "",
  setStateInput = () => {},
  field = "email",
  placeholder = "Email Address",
  label = "Email",
  type = "text",
  showLabel = true,
  validate = 0,
  setValidation = () => {},
  disabled = false,
  required = true,
  pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
  errorMessage = "* Invalid email address",
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
    pattern,
  });

  useEffect(() => {
    if (required === false || initialValidation === false) return;
    validationError();
  }, [initialValidation]);

  useEffect(() => {
    if (validate === 0) return;
    validateEmail();
  }, [validate]);

  function validateEmail() {
    if (required === false) return;

    let testValue = "";

    validationError();

    directInput ? (testValue = stateInput) : (testValue = input[field]);
    const regex = new RegExp(pattern, "g");
    if (regex.test(testValue)) {
      setError(false);
      return;
    }
    setError(true);
  }

  function handleBlur() {
    if (blurValidation) {
      validateEmail();
    }
  }

  function handleChange(txt) {
    if (disabled == true) return;
    txt = txt.toLowerCase();
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
      validateEmail();
    }
  }

  return (
    <Input mt={mt} mb={mb}>
      <InputLabel label={label} showLabel={showLabel} />
      <input
        className={`${error ? inputClass.error : inputClass.base} border-1 border-black bg-gray-300 text-gray-500`}
        type={type}
        value={directInput ? stateInput : input[field]}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <InputError
        input={directInput ? stateInput : input[field]}
        message={errorMessage}
        error={error}
      />
    </Input>
  );
};

export default Email;
