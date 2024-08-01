import { Outlet } from "react-router-dom";

function CalendarContainer() {
  return (
    <div className=" w-full">
      <Outlet />
    </div>
  );
}

export default CalendarContainer;