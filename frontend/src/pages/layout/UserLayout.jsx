import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function UserLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default UserLayout
