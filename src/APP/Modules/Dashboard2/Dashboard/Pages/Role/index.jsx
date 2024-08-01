import { Outlet } from "react-router-dom";

function Role() {
  return (
    <div className="w-full">
      <h1 style={{ fontSize: "3rem", fontFamily: "Impact", color: "#0E2F59" }}>ROLES</h1>
      <Outlet />
    </div>
  );
}


export default Role;
