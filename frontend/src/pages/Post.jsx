import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get, Base_url } from '../services/Endpoint'

function Post() {
  const { id } = useParams()
  const [singleblog, setSingleblog] = useState(null)
  const singlePost = async () => {
    try {
      const responce = await get(`/public/singlepost/${id}`)
      const data = responce.data
      setSingleblog(data.post)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    singlePost()
  }, [])
  return (
    <>
      <div className='container text-white mt-5 mb-5'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='fw-bold text-white mb-4 display-4'>{singleblog && singleblog.title}</h1>
            <img src={ singleblog && `${Base_url}/images/${singleblog.image}`}
              alt="Exploring the art of writing"
              className='img-fluid-mb-2 '
              style={{ width: '100%', borderRadious: "10px", objectFit: 'cover', maxHeight: '500px' }}
            />
            <p className='mb-5 '>
              {singleblog && singleblog.desc}
            </p>
            <hr />
            <h3 className='mt-5 mb-4'>Leave a Comment</h3>
            <form >
              <div className='mb-3'>
                <label htmlFor='comment' className='form-label'>Comment</label>
                <textarea className='form-control white-placeholder' id="comment" rows="4"
                  style={{ backgroundColor: "#181a1b", color: "white", border: "1px solid #444" }}
                  placeholder='write your comment here' required />

              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <hr />
            <h3 className='mt-5 mb-4'>Comments</h3>
            {/* 1user comment part */}
            {singleblog && singleblog.comments.map((Comment)=>{
              return (
                < div className='bg-secondary p-3 rounded mb-3 d-flex'>
              <img src={`${Base_url}/images/${Comment.userId.profile}`}
                alt="John Doe"
                className='irounded-circle me-3'
                style={{ width: '50px', height: "50px", objectFit: 'cover' ,borderRadius: '50%'}}
              />
              <div>
                <h5 className='mb-1'>{Comment.userId.username}</h5>
                <p className='mb-0'>{Comment.comment}</p>
                {/* 1user comment part */}
              </div>
            </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
