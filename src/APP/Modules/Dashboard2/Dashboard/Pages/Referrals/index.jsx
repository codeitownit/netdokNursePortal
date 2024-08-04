import React from 'react';
import { Outlet } from 'react-router-dom';

function Refer() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default Refer