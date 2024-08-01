/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

import useValidation from "./useValidation";

import inputClass from "./input.style";

const NumberInput = ({
  input = { number: "" },
  setInput = () => {},
  stateInput = "",
  setStateInput = () => {},
  field = "number",
  placeholder = "",
  label = "Number",
  showLabel = true,
  validate = 0,
  setValidation = () => {},
  disabled = false,
  required = true,
  errorMessage = "Invalid input",
  directInput = false,
  blurValidation = true,
  directValidation = true,
  initialValidation = true,
  mt = 0,
  mb = 0,
  min = null,
  max = null,
  ex = "",
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
    min,
    max,
  });

  useEffect(() => {
    if (required === false || initialValidation === false) return;
    validationError();
  }, [initialValidation]);

  useEffect(() => {
    if (validate === 0) return;
    validateInput();
  }, [validate]);

  function validateInput(no) {
    if (required === false) return;

    let testValue = "";

    validationError();

    if (no === null) {
      directInput ? (testValue = stateInput) : (testValue = input[field]);
    } else {
      testValue = no;
    }

    if (isNaN(parseInt(testValue))) {
      setError(true);
      return;
    }

    setError(false);
  }

  function handleBlur() {
    if (blurValidation) {
      validateInput();
    }
  }

  function handleChange(txt) {
    if (disabled == true) return;

    if (isNaN(parseInt(txt)) && txt !== "") {
      return;
    }

    if (isNaN(parseInt(txt))) {
      if (!min) {
        return;
      }
      txt = min?.toString();
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
      validateInput(txt);
    }
  }

  return (
    <Input mt={mt} mb={mb}>
      <InputLabel label={label} showLabel={showLabel} />
      <input
        className={`${error ? inputClass.error : inputClass.base} ${ex}`}
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

export default NumberInput;
