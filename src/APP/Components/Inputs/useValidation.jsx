import { useEffect } from "react";

const useValidation = ({
  input = { phone: "" },
  stateInput = "",
  field = "phone",
  required = true,
  setValidation = () => {},
  directInput = false,
  blurValidation = true,
  initialValidation = true,
  min = null,
  max = null,
  pattern = null,
  minChar = null,
  maxChar = 999,
  select_input = false,
}) => {
  useEffect(() => {
    if (required === false || initialValidation === false) return;

    validationError();
  }, [initialValidation]);

  function blurValidationFn() {
    if (blurValidation) {
      validationError();
    }
  }

  function updateValidationError(the_value = false) {
    setValidation((c) => {
      let nc = { ...c };
      nc[field] = the_value;
      return nc;
    });
  }

  function validationError() {
    let testValue = "";
    directInput
      ? (testValue = stateInput || "")
      : (testValue = input[field] || "");
    testValue = testValue.replace(/,/g, "");

    if (testValue === "" && required === false) {
      return;
    }

    if (min) {
      let n = parseInt(testValue);

      if (!isNaN(n)) {
        if (min > n) {
          updateValidationError(true);
          return;
        }
      }
    }

    if (max) {
      let n = parseInt(testValue);
      if (!isNaN(n)) {
        if (n > max) {
          updateValidationError(true);
          return;
        }
      }
    }

    if (minChar) {
      if (testValue?.length < minChar) {
        updateValidationError(true);
        return;
      }
    }

    if (pattern) {
      let regex = new RegExp(pattern);

      if (!regex.test(testValue)) {
        updateValidationError(true);
        return;
      }
    }

    if (select_input && required === true) {
      if (testValue === "") {
        updateValidationError(true);
        return;
      }
    }
    updateValidationError(false);
  }

  return { validationError: blurValidationFn };
};

export default useValidation;
