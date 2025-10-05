import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, Base_url } from '../services/Endpoint';
import './BlogStyles.css';

export const Recentpost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };

  const fetchPosts = async () => {
    try {
      const res = await get('/blog/getall');
      if (res.data && res.data.posts) {
        setPosts(res.data.posts);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="recentpost-container">
      <h2 className="recentpost-title">Recent Posts</h2>
      <div className="recentpost-grid">
        {posts.length === 0 ? (
          <p className="text-muted">No posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="recentpost-card" onClick={() => handleClick(post._id)}>
              {post.image && (
                <img
                  src={`${Base_url}/images/${post.image}`}
                  alt={post.title}
                  className="recentpost-img"
                />
              )}
              <div className="recentpost-body">
                <h5>{post.title}</h5>
                <p>{post.desc}</p>
                <button className="btn-read" onClick={() => handleClick(post._id)}>Read Article</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
