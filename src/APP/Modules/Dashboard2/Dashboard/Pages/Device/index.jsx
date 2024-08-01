import { Outlet } from "react-router-dom";

function Device() {
  return (
    <div className=" w-full">
      <Outlet />
    </div>
  );
}

export default Device;