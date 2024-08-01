/* eslint-disable react/prop-types */

import { TbMenuOrder } from "react-icons/tb";

const Ta = ({ children, id, active_id, setActiveId }) => {
  function handleToggle() {
    if (active_id === id) {
      setActiveId(null);
      return;
    }

    setActiveId(id);
  }

  return (
    <div className="relative ">
      <span
        onClick={handleToggle}
        className=" cursor-pointer active:opacity-50 text-primary text-2xl"
      >
        <TbMenuOrder />
      </span>

      {id === active_id && (
        <div
          className=" absolute flex flex-col gap-y-3  px-4 py-2 rounded-md z-50 shadow-lg bg-white whitespace-nowrap mb-2 "
          style={{ left: "-25%" }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Ta;
