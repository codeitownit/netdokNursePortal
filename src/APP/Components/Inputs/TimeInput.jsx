import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import inputClass from "./input.style";
import useValidation from "./useValidation";

const TimeInput = ({
  input = { timeInput: "" },
  setInput = () => {},
  stateInput = "",
  setStateInput = () => {},
  field = "timeInput",
  placeholder = "hh:mm AM/PM",
  label = "Time Input",
  showLabel = true,
  validate = 0,
  setValidation = () => {},
  disabled = false,
  required = true,
  pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)$/, // Time pattern (hh:mm AM/PM)
  errorMessage = "Invalid time format",
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
  const [selectedTime, setSelectedTime] = useState(""); // State for the selected time

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

  function handleClick() {
    const currentTime = formatCurrentTime(); // Get the current time formatted
    setSelectedTime(currentTime); // Update selected time
    if (directInput) {
      setStateInput(currentTime);
    } else {
      setInput((prevState) => ({
        ...prevState,
        [field]: currentTime,
      }));
    }
    validateInput(currentTime);
  }

  // Function to format current time as "hh:mm AM/PM"
  function formatCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  }

  return (
    <Input mt={mt} mb={mb}>
      <InputLabel label={label} showLabel={showLabel} />
      <input
        type="text"
        value={selectedTime} // Set the selected time
        onClick={handleClick} // Handle click event to auto-fill current time
        onBlur={handleBlur} // Handle blur event
        placeholder={placeholder} // Set the placeholder text
        className={`w-full ${error ? inputClass.error : inputClass.base} ${ex}`}
        disabled={disabled}
        readOnly // Make input read-only to prevent manual editing
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

export default TimeInput;
