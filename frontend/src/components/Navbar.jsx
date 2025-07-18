import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../redux/AuthSlice';
import { post, Base_url } from '../services/Endpoint';
import { persistor } from '../redux/store';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await post('/auth/logout'); // send request to backend
      console.log('Logout success:', response.data);

      dispatch(removeUser());         // clear Redux state
      await persistor.purge();        //  clear redux-persist localStorage
      navigate('/login');             // redirect to login
    } catch (err) {
      console.error('Logout error:', err);
    }

  }
  // const [islogin, setIsLogin] = useState(true);
  const user = useSelector((state) => state.auth.user)
  console.log('user:', user);


  return (
    <nav className="navbar d-flex justefy-content-between align-items-center p-3">
      {/* <h1 className='mx-5 text-white fs-2 fw-bold'>Navber</h1> */}
      <Link to={'/'}><h1 className='mx-5 text-white fs-2 fw-bold'>GeoGlimpse</h1></Link>
      <div className='d-flex align-item-center'>

        {!user ? <Link to={'/login'}><h1 className='btn_sign mx-3'>Sign in</h1></Link> :
          (<div className='dropdown'>
            <div className='avatar-container pointer roundedcircle overflow-hidden bg-info ' data-bs-toggle='dropdown' aria-expanded='false' style={{ width: '40px', height: '40px', cursor: 'pointer' }}>
              <img src={`${Base_url}/images/${user.profile}`}
                className='img-fluid h-100 w-100  rounded-circle'
                style={{ objectFit: 'cover' }} alt='' />
            </div>
            <ul className='dropdown-menu dropdown-menu-end dropdown-menu-dark'>
              {user.role === 'admin' ? <li><Link className='dropdown-item' to='/dashboard'>Dashboard</Link></li> : null}

              <li><Link className='dropdown-item' to='/profile/1212'>Profile</Link></li>
              <li><a className='dropdown-item' style={{ cursor: "pointer" }} onClick={handleLogout}>Sign out</a></li>
            </ul>
          </div>)}


      </div>
    </nav>
  );
};

export default Navbar;
