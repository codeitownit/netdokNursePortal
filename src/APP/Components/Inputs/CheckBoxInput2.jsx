/* eslint-disable react/prop-types */
import React from "react";
import CheckBox from "./CheckBox";

const CheckBoxInput = ({
  index,
  label = "Check it",
  input = { checked: false },
  setInput = () => {},
  stateInput = false,
  setStateInput = () => {},
  field = "checked",
  disabled = false,
  directInput = true,
  s = 1,
  is_after_box = true,
}) => {
  return React.createElement(
    "div",
    { className: "flex items-center gap-x-2" },
    [
      !is_after_box &&
        React.createElement(
          "span",
          { className: "font-medium text-lg" },
          label
        ),
      React.createElement(CheckBox, {
        key:index,
        input: input,
        setInput: setInput,
        stateInput: stateInput,
        setStateInput: setStateInput,
        field: field,
        disabled: disabled,
        directInput: directInput,
        s: s,
      }),
      is_after_box &&
        React.createElement(
          "span",
          { className: "font-medium text-lg" },
          label
        ),
    ]
  );
};

export default CheckBoxInput;
