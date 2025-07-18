import React, { useState } from 'react';
import { post } from '../../services/Endpoint';
import { useNavigate } from 'react-router-dom';

function Addpost() {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    image: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('desc', formData.desc);
    data.append('image', formData.image);

    try {
      const res = await post('/blog/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const dataa = res.data;
      console.log(dataa);
      alert("✅ Post created successfully!");
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Error:', err);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="mx-auto p-4"
        style={{
          maxWidth: '600px',
          backgroundColor: '#1e293b', // slate-800
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          color: '#f8fafc' // text-slate-50
        }}
      >
        <h3 className="text-center mb-4" style={{ color: '#38bdf8' }}>Add New Post</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter post title"
              style={{
                backgroundColor: '#334155',
                border: 'none',
                color: 'white'
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control"
              style={{
                backgroundColor: '#334155',
                border: 'none',
                color: 'white'
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Enter post description"
              style={{
                backgroundColor: '#334155',
                border: 'none',
                color: 'white'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#38bdf8',
              color: '#0f172a',
              fontWeight: '600',
              borderRadius: '0.5rem'
            }}
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addpost;
