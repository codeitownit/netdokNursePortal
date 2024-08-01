import { Outlet } from "react-router-dom";

function Transfer() {
  return (
    <div className="w-full">
      <h1 style={{ fontSize: "3rem", fontFamily: "Impact", color: "#0E2F59" }}>Transferred Patients</h1>
      <Outlet />
    </div>
  );
}


export default Transfer;
