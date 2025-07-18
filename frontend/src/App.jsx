import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Post from './pages/Post'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserLayout from './pages/layout/UserLayout'
import AdminLayout from './pages/layout/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Addpost from './pages/admin/Addpost'
import Users from './pages/admin/Users'
import Allposts from './pages/admin/Allposts'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<UserLayout />} >
            <Route index element={<Home />} />
            <Route path='post/:id' element={<Post />} />
            <Route path='profile/:id' element={<Profile />} />
          </Route>

          <Route path='/dashboard' element={<AdminLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='addpost' element={<Addpost />} />
            <Route path='users' element={<Users />} />
            <Route path='allpost' element={<Allposts />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />



        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
