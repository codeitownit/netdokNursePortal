/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";

const CheckBox = ({
  input = { checked: false },
  setInput = () => {},
  stateInput = true,
  setStateInput = () => {},
  field = "checked",
  disabled = false,
  directInput = true,
  s = 1,
}) => {
  const [checked, setChecked] = useState(false);

  const init = useRef(0);

  useEffect(() => {
    init.current = init.current + 1;
    if (directInput) {
      setChecked(stateInput || false);
      return;
    }
    setChecked(input[field] || false);
  }, []);

  useEffect(() => {
    if (init.current === 0) return;
    if (directInput) {
      if (stateInput) {
        setChecked(true);
        return;
      }
      setChecked(false);
      return;
    }

    if (input?.[field]) {
      setChecked(true);
      return;
    }
    setChecked(false);
  }, [input, stateInput]);

  function handleOnChange() {
    if (disabled === true) return;

    if (checked) {
      if (directInput) {
        setStateInput(false);
      } else {
        setInput((c) => {
          const newObj = { ...c };
          newObj[field] = false;
          return newObj;
        });
      }
      return;
    }

    if (directInput) {
      setStateInput(true);
    } else {
      setInput((c) => {
        const newObj = { ...c };
        newObj[field] = true;
        return newObj;
      });
    }
  }

  return React.createElement("input", {
    className: " border border-primary cursor-pointer ",
    type: "checkbox",
    checked: checked,
    onChange: handleOnChange,
    disabled: disabled,
    style: { opacity: disabled ? 0.5 : 1, height: `${s}em`, width: `${s}em` },
  });
};

export default CheckBox;
