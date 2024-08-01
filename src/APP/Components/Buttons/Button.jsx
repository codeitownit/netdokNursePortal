import React from "react";
import { IconContext } from "react-icons";

const Button = ({
  text = "Button",
  onClick = () => {},
  disabled = false,
  style = {},
  clss = "",
  icon = "",
  type=""
}) => {
  function handleClick(e) {
    if (!disabled) {
      onClick(e);
    }
  }

  return (
    <button
      onClick={(e) => handleClick(e)}
      disabled={disabled}
      style={{
        ...style,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={clss}
      type={type}
    > 
      <IconContext.Provider value={{ size: "1.5em", style: { padding: "0.15em" }}}>
        {icon}
      </IconContext.Provider>
      <span>{text}</span>
    </button>
  );
};

export default Button;
