import React from 'react';
import { Outlet } from 'react-router-dom';

function Med() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default Med