import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import inputClass from "./input.style";
import { transforms } from "./Utils/transform.js";
import useValidation from "./useValidation";

const DateInput = ({
  input = { dateInput: "" },
  setInput = () => {},
  stateInput = "",
  setStateInput = () => {},
  field = "dateInput",
  placeholder = "dd/mm/yyyy",
  label = "Date Input",
  showLabel = true,
  validate = 0,
  setValidation = () => {},
  disabled = false,
  required = true,
  pattern = /^\d{2}\/\d{2}\/\d{4}$/, // Date pattern (dd/mm/yyyy)
  errorMessage = "Invalid date format",
  directInput = false,
  blurValidation = true,
  initialValidation = true,
  transform = "trim", // You can adjust the transformation as needed
  mt = 0,
  mb = 0,
  ex = "",
  type = "text",
}) => {
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // State for the selected date

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
    if (validate === 0) return;
    validateInput(null);
  }, [validate]);

  useEffect(() => {
    if (required === false || initialValidation === false) return;
    validationError();
  }, [initialValidation]);

  function validateInput(txt) {
    if (!required) return;

    validationError();

    const testValue = txt || (directInput ? stateInput : input[field]) || "";

    if (!pattern.test(testValue)) {
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

  function handleChange(date) {
    setSelectedDate(date); // Update selected date
    const formattedDate = date ? formatDate(date) : ""; // Format date as needed
    if (directInput) {
      setStateInput(formattedDate);
    } else {
      setInput((prevState) => ({
        ...prevState,
        [field]: formattedDate,
      }));
    }
    validateInput(formattedDate);
  }

  // Function to format date as "dd/mm/yyyy"
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <Input mt={mt} mb={mb}>
      <InputLabel label={label} showLabel={showLabel} />
      <DatePicker
        selected={selectedDate} // Set the selected date
        onChange={handleChange} // Handle date change
        onBlur={handleBlur} // Handle blur event
        dateFormat="dd/MM/yyyy" // Specify the date format
        placeholderText={placeholder} // Set the placeholder text
        className={`${error ? inputClass.error : inputClass.base} ${ex}`}
        disabled={disabled}
        showMonthDropdown // Show month dropdown
        showYearDropdown // Show year dropdown
        dropdownMode="select" // Dropdown mode
        autoComplete="off" // Disable autocomplete
      />
      <InputError
        input={directInput ? stateInput : input[field]}
        message={errorMessage}
        error={error}
      />
    </Input>
  );
};

export default DateInput;
