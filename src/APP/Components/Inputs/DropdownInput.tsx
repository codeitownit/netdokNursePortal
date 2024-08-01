import React, { useEffect, useState } from "react";
import Input from "./Input.jsx";
import InputError from "./InputError.jsx";
import InputLabel from "./InputLabel.jsx";
import inputClass from "./input.style.js";
import { transforms } from "./Utils/transform.js";
import useValidation from "./useValidation.jsx";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps extends TextInputProps {
  options: DropdownOption[];
}

const Dropdown: React.FC<DropdownProps> = ({
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
  options,
}: DropdownProps) => {
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

  function validateInput(txt: any) {
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

  function handleChange(txt: string) {
    if (disabled) return;
    if (txt.length > maxChar) return;

    if (transforms[transform]) {
      txt = transforms[transform](txt) || txt;
    }

    if (directInput) {
      setStateInput(txt);
    } else {
      setInput((prevState: any) => ({
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
      <select
        className={`${error ? inputClass.error : inputClass.base} ${ex}`}
        value={directInput ? stateInput : input[field] || ""}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <InputError
        input={directInput ? stateInput : input[field]}
        message={errorMessage}
        error={error}
      />
    </Input>
  );
};

export default Dropdown;
