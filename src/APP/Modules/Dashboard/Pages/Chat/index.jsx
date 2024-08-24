import React from 'react';
import { Outlet } from 'react-router-dom';

function ChatBox() {
  return (
    <div className=" w-full">
    <Outlet />
  </div>
  )
}

export default ChatBox