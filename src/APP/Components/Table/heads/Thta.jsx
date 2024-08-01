/* eslint-disable react/prop-types */
import { useState } from "react";

import { BiSolidSortAlt } from "react-icons/bi";

const Thta = ({ txt = "", onClick = () => {}, field = "", init = "desc" }) => {
  const [b, setB] = useState(init === "asc" ? "asc" : "desc");

  function handleSort() {
    if (b === "asc") {
      onClick(`${field}-desc`);
      setB("desc");
      return;
    }
    onClick(`${field}-asc`);
    setB("asc");
  }

  return (
    <th
      onClick={handleSort}
      className="px-4 uppercase text-lg font-semibold py-4 cursor-pointer "
    >
      <span className="flex items-center gap-x-2">
        <span>{txt}</span>

        <span className=" text-primary ">
          <BiSolidSortAlt />
        </span>
      </span>
    </th>
  );
};

export default Thta;
