import React from 'react';
import { Outlet } from 'react-router-dom';

function SingleWard() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default SingleWard