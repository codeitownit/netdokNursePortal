import React from 'react'
import { Outlet } from 'react-router-dom'

function index() {
  return (
    <div className=" w-full">
        <Outlet />
    </div>
  )
}

export default index