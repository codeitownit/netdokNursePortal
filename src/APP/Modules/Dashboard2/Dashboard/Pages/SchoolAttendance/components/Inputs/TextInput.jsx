import React, { useEffect, useState } from "react";
import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import inputClass from "./input.style";
import { transforms } from "./Utils/transform.js";
import useValidation from "./useValidation";

const TextInput = ({
  input = { textInput: "" },
  setInput = () => {},
  stateInput = "",
  setStateInput = () => {},
  field = "textInput",
  placeholder = "",
  label = "Text Input",
  showLabel = true,
  validate = 0,
  setValidation = () => {},
  disabled = false,
  required = true,
  pattern = null,
  errorMessage = "Min no of characters",
  directInput = false,
  blurValidation = true,
  directValidation = true,
  initialValidation = true,
  transform = "capWord",
  minChar = 0,
  maxChar = 999,
  mt = 0,
  mb = 0,
  ex = "",
  type = "text",
}) => {
  const [error, setError] = useState(false);
  // const [stateInput, setStateInput] = useState("");

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
    minChar,
  });

  useEffect(() => {
    if (validate === 0) return;
    validateInput(null);
  }, [validate]);

  useEffect(() => {
    if (required === false || initialValidation === false) return;
    validationError();
  }, [initialValidation]);

  function validateInput(txt) {
    if (!required) return;
    let testValue = "";

    validationError();

    if (!txt) {
      testValue = directInput ? stateInput : input[field] || "";
    } else {
      testValue = txt;
    }

    if (pattern && !new RegExp(pattern).test(testValue)) {
      setError(true);
      return;
    }

    if (testValue.length < minChar) {
      setError(true);
      return;
    }

    setError(false);
  }

  function handleBlur() {
    if (blurValidation) {
      validateInput(null);
    }
  }

  function handleChange(txt) {
    if (disabled) return;
    if (txt.length > maxChar) return;
    // console.log(txt);
    if (transforms[transform]) {
      txt = transforms[transform](txt);
    }

    if (directInput) {
      setStateInput(txt);
    } else {
      setInput((prevState) => ({
        ...prevState,
        [field]: txt,
      }));
    }

    if (directValidation || error) {
      validateInput(txt);
    }
  }

  return (
    <Input mt={mt} mb={mb}>
      <InputLabel label={label} showLabel={showLabel} />
      <input
        className={`${error ? inputClass.error : inputClass.base} ${ex}}`}
        value={directInput ? stateInput : input[field] || ""}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
        type={type}
      />
      <InputError
        input={directInput ? stateInput : input[field]}
        message={errorMessage}
        error={error}
      />
    </Input>
  );
};

export default TextInput;
