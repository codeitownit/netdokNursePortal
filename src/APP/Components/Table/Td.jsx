/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Td = ({ children, name = "Hello" }) => {
  return (
    <>
      {/* This is for medium devices and above. */}
      <td className=" text-left px-4 py-4 my-2 ">{children}</td>
      {/* This is for small screens only.*/}
      {/* <td className="sm:hidden uppercase text-gray-500 border border-slate-600  ">
        &nbsp;{children}
      </td> */}
    </>
  );
};

export default Td;
