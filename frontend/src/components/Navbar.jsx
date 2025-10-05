import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../redux/AuthSlice';
import { post, Base_url } from '../services/Endpoint';
import { persistor } from '../redux/store';
import './BlogStyles.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await post('/auth/logout');
      dispatch(removeUser());
      await persistor.purge();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Safely build profile image URL
  const profileSrc = user?.profile
    ? user.profile.startsWith('default/')
      ? `${Base_url}/${user.profile}`
      : `${Base_url}/images/${user.profile}`
    : 'https://randomuser.me/api/portraits/lego/1.jpg'; // fallback

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        GeoGlimpse
      </Link>

      <div className="navbar-right">
        {!user ? (
          <Link to="/login" className="navbar-signin">
            Sign in
          </Link>
        ) : (
          <div className="navbar-user dropdown">
            <div
              className="avatar"
              data-bs-toggle="dropdown"
              style={{ cursor: 'pointer' }}
            >
              <img
                src={profileSrc || null}
                alt="profile"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
            </div>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
              {user.role === 'admin' && (
                <li>
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link className="dropdown-item" to={`/profile/${user._id}`}>
                  Profile
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
