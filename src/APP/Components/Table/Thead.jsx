/* eslint-disable react/prop-types */

const Thead = ({ children }) => {
  return (
    <thead className="hidden sm:table-header-group ">
      <tr className=" text-left  ">{children}</tr>
    </thead>
  );
};

export default Thead;
