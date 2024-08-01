/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

import { formatNumberWithCommas } from "./Utils/transform.js";

import useValidation from "./useValidation";

const MonetaryInput = ({
  input = { phone: "" },
  setInput = () => {},
  stateInput = "",
  setStateInput = () => {},
  field = "phone",
  prefix = "KES",
  showPrefix = true,
  placeholder = "",
  label = "Phone",
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
}) => {
  const [error, setError] = useState(false);

  const [em, setEm] = useState(errorMessage);

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

  function validateInput(no = null) {
    if (required === false) return;
    let testValue = "";
    validationError();
    if (no === null) {
      directInput ? (testValue = stateInput) : (testValue = input[field]);
    } else {
      testValue = no;
    }

    testValue = testValue.replace(/,/g, "");

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

  function handleChange(no) {
    if (disabled == true) return;
    if (isNaN(parseInt(no)) && no !== "") {
      return;
    }

    let n = no.replace(/,/g, "");

    if (isNaN(n)) {
      return;
    }

    if (min) {
      let no = parseInt(n);
      if (!isNaN(no)) {
        if (min > no) {
          setEm(`Minimum no ${min}`);
          return;
        }
      }
    }

    if (max) {
      let no = parseInt(n);
      if (!isNaN(no)) {
        if (no > max) {
          return;
        }
      }
    }

    if (isNaN(parseInt(n))) {
      if (!min) {
        return;
      }
      n = min?.toString();
    }

    if (directInput) {
      setStateInput(n);
    } else {
      setInput((c) => {
        let newObj = { ...c };
        newObj[field] = parseInt(n).toString();
        return newObj;
      });
    }
    if (directValidation || error == true) {
      validateInput(parseInt(n).toString());
    }
  }

  return (
    <Input mt={mt} mb={mb}>
      <InputLabel label={label} showLabel={showLabel} />
      <div
        className="w-full flex gap-x-2 items-center border-2 rounded-lg   py-1 px-4"
        style={{ backgroundColor: "white" }}
      >
        {showPrefix && (
          <p className=" px-4 py-1 rounded-md bg-anti-flash-white taupe-gray  ">
            {prefix}
          </p>
        )}
        <input
          className={`w-full flex-1`}
          value={formatNumberWithCommas(
            directInput ? stateInput : input[field]
          )}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </div>
      <InputError
        input={directInput ? stateInput : input[field]}
        message={em}
        error={error}
      />
    </Input>
  );
};

export default MonetaryInput;
