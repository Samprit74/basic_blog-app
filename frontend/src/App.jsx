import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

import UserLayout from './pages/layout/UserLayout';
import AdminLayout from './pages/layout/AdminLayout';

import Dashboard from './pages/admin/Dashboard';
import Addpost from './pages/admin/Addpost';
import Users from './pages/admin/Users';
import Allposts from './pages/admin/Allposts';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        {/* Public Auth Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* User Routes */}
        <Route
          path='/'
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path='post/:id' element={<Post />} />
          <Route path='profile/:id' element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path='/dashboard/*'
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='addpost' element={<Addpost />} />
          <Route path='users' element={<Users />} />
          <Route path='allpost' element={<Allposts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
