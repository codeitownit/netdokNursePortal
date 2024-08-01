import React, { ReactNode, useState } from "react";

interface props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

const EdgeBtn = ({
  children,
  onClick,
  disabled = false,
  label = "Update document",
}: props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`border-dashed border-2 relative cursor-pointer p-2`}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}

      {disabled === false ? (
        <LabelInfo label={label} isHovered={isHovered} />
      ) : null}
    </div>
  );
};

const LabelInfo = ({ label = "", isHovered = false }) => {
  if (isHovered == false) {
    return null;
  }

  return (
    <div
      className=" w-full h-full top-0 absolute flex justify-center items-center text-white
        text-lg
      "
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      {label}
    </div>
  );
};

export default EdgeBtn;
