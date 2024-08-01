/* eslint-disable react/prop-types */
const InputLabel = ({ label = "", showLabel = true }) => {
  if (showLabel === false) return null;

  return <div className="">{label}</div>;
};

export default InputLabel;
