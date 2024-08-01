import React from 'react'
import { Outlet } from 'react-router-dom'

function Parent() {
  return (
    <div>
    <div></div>
    <Outlet />
    </div>
  )
}

export default Parent