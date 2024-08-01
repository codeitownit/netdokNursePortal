/* eslint-disable react/prop-types */

const ABtn = ({ txt = "", onClick = () => {}, children = null }) => {
  return (
    <span
      onClick={onClick}
      className=" flex items-center gap-x-2  cursor-pointer  text-cadet_grey hover:text-primary"
    >
      <span>{children}</span>
      <span className="">{txt}</span>
    </span>
  );
};

export default ABtn;
