import React from 'react';
import { Outlet } from 'react-router-dom';

function SingleDep() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default SingleDep