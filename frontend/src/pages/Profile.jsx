import React, { useEffect, useState } from 'react';
import { FaCamera, FaRegEdit, FaRegClone } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Base_url, get } from '../services/Endpoint';
import './Profile.css';

function Profile() {
  const user = useSelector(state => state.auth.user);
  const [profilePreview, setProfilePreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (user?.profile && user.profile.trim() !== '') {
      setProfilePreview(
        user.profile.startsWith('default/')
          ? `${Base_url}/${user.profile}`
          : `${Base_url}/images/${user.profile}`
      );
    } else {
      setProfilePreview('https://randomuser.me/api/portraits/lego/1.jpg');
    }
  }, [user]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?._id) return;
      try {
        const res = await get(`/blog/user/${user._id}`);
        setUserPosts(res.data.posts || []);
      } catch (err) {
        console.error('Error fetching user posts:', err);
      }
    };
    fetchUserPosts();
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-pic-wrapper">
          <img src={profilePreview || null} alt="Profile" className="profile-pic" />
          <label htmlFor="profileImage" className="camera-overlay">
            <FaCamera />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="profile-image-input"
          />
        </div>
        <div className="profile-info">
          <h2 className="username">{user?.username || 'User'}</h2>
          <p className="user-email">{user?.email}</p>
          <button className="edit-profile-btn">
            <FaRegEdit /> Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-posts">
        <div className="posts-header">
          <FaRegClone className="posts-icon" />
          <span>Posts</span>
        </div>

        {userPosts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          <div className="posts-grid">
            {userPosts.map(post => (
              <div className="post-card" key={post._id}>
                {post.image && (
                  <img
                    src={post.image ? `${Base_url}/images/${post.image}` : null}
                    alt={post.title}
                  />
                )}
                <div className="post-title">{post.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
