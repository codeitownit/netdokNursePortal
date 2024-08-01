/* eslint-disable react/prop-types */
const InputError = ({ input = "", message = "", error = true }) => {
  if (error === false) return null;

  return (
    <small
      className=" text-red-400 "
      style={{ opacity: error ? "100%" : "0%", fontSize: 12 }}
    >
      {input === "" ? "* Field required" : message}
    </small>
  );
};

export default InputError;
