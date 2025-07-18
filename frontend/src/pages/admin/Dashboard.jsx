import React from 'react'

import { useEffect, useState } from 'react'
import { get } from '../../services/Endpoint'
import PostCommentChart from '../../components/PostCommentChart'
import CommentPerUserChart from '../../components/CommentPerUserChart';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const GetData = async () => {
    try {
      const responce = await get('/dashboard')
      const data = responce.data
      setPosts(data.posts)
      setUsers(data.users)
      setComments(data.comments)

      console.log("details:", data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    GetData()
  }, [])
  return (
    <>
      <div>
        <h2 className='mb-4 text-white'>Dashboard</h2>
        <div className='row'>
          <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
            <div className='card bg-primary text-white mb-4'>
              <div className='card-body'>
                <h5 className='card-title '> Total Users</h5>
                <p className='card-text'>{users && users.length}</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
            <div className='card bg-success text-white mb-4'>
              <div className='card-body'>
                <h5 className='card-title '> Total Posts</h5>
                <p className='card-text'>{posts && posts.length}</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
            <div className='card bg-warning text-white mb-4'>
              <div className='card-body'>
                <h5 className='card-title '>Total Comments</h5>
                <p className='card-text'>{comments && comments.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <PostCommentChart posts={posts} comments={comments} />
          </div>
          <div className="col-md-6 mb-4">
            <CommentPerUserChart data={{ users, comments, posts }} />
          </div>
        </div>

      </div>
    </>

  )
}

export default Dashboard
