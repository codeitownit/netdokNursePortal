import React from 'react';
import { Outlet } from 'react-router-dom';

function Notification() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default Notification