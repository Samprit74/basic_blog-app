import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get, Base_url } from "../services/Endpoint";
  // ✅ correct path
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import "./Post.css";

function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await get("/blog/getall"); // ✅ same as backend route
        if (res.data && res.data.success) {
          console.log("Fetched posts:", res.data.posts);
          setPosts(res.data.posts);
        } else {
          console.error("Unexpected API response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return <p className="text-center text-white mt-5">Loading posts...</p>;

  if (posts.length === 0)
    return <p className="text-center text-white mt-5">No posts available.</p>;

  return (
    <div className="container text-white mt-5 mb-5">
      <h2 className="text-white mb-4">All Posts</h2>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post._id}>
            <div className="post-card bg-light rounded p-3 h-100 d-flex flex-column shadow">
              {post.image ? (
                <img
                  src={`${Base_url}/images/${post.image}`} // ✅ points to port 7000
                  alt={post.title}
                  className="post-image mb-3 rounded"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
                />
              ) : (
                <img
                  src="/fallback.jpg"
                  alt="default"
                  className="post-image mb-3 rounded"
                />
              )}
              <h5 className="text-dark">{post.title}</h5>
              <p className="text-secondary">
                {post.desc?.substring(0, 100)}...
              </p>
              <div className="mt-auto d-flex justify-content-between">
                <button className="btn btn-warning btn-sm text-dark">
                  <FaEdit /> Edit
                </button>
                <button className="btn btn-danger btn-sm">
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
