import React from 'react';
import { Outlet } from 'react-router-dom';

function Vaccination() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default Vaccination