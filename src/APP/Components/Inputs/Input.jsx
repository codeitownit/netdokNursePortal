/* eslint-disable react/prop-types */

const Input = ({ children, mt = 0, mb = 0 }) => {
  return (
    <div
      className="w-full flex flex-col "
      style={{ marginTop: mt, marginBottom: mb }}
    >
      {children}
    </div>
  );
};

export default Input;
