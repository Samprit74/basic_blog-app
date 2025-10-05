import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get, post as postRequest, Base_url } from '../services/Endpoint';
import './BlogStyle.css';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const getUserId = () => {
    const authData = localStorage.getItem('persist:root');
    if (!authData) return null;
    try {
      const auth = JSON.parse(authData).auth;
      const user = JSON.parse(auth.user);
      return user._id;
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
      return null;
    }
  };

  const fetchPostAndComments = async () => {
    try {
      const postRes = await get(`/blog/get/${id}`);
      setPost(postRes.data.post);

      const commentsRes = await get(`/comment/post/${id}`);
      setComments(commentsRes.data.comments || []);
    } catch (err) {
      console.error('Error fetching post/comments:', err);
    }
  };

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return alert('Comment cannot be empty');

    const userId = getUserId();
    if (!userId) return alert('Please login to post a comment');

    try {
      await postRequest('/comment/addcomment', {
        postId: id,
        userId,
        comment: commentText
      });

      setCommentText('');
      const commentsRes = await get(`/comment/post/${id}`);
      setComments(commentsRes.data.comments || []);
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Failed to submit comment. Try again.');
    }
  };

  if (!post) return <div className="text-white text-center mt-5">Loading...</div>;

  return (
    <div className="post-container">
      <div className="post-card">
        <h2>{post.title}</h2>
        {post.image && (
          <img
            className="post-img"
            src={`${Base_url}/images/${post.image}`}
            alt={post.title}
          />
        )}
        <p>{post.desc}</p>
      </div>

      <div className="comments-section">
        <h5>Comments</h5>

        <div className="add-comment">
          <textarea
            placeholder="Add your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Post Comment</button>
        </div>

        {comments.length === 0 ? (
          <p className="text-muted">No comments yet</p>
        ) : (
          comments.map((c, index) => (
            <div
              className="comment-card"
              key={c._id ? c._id : `comment-${index}-${c.createdAt}`}
            >
              <img
                src={`${Base_url}/images/${c.userId?.profile || 'default.png'}`}
                alt={c.userId?.username || 'User'}
                className="comment-user-img"
              />
              <div>
                <strong>{c.userId?.username || 'Unknown'}</strong>
                <p>{c.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
