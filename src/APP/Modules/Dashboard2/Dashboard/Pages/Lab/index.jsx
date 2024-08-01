import React from 'react';
import { Outlet } from 'react-router-dom';

function Lab() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default Lab