import React from 'react';
import { Outlet } from 'react-router-dom';

function Discharge() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default Discharge