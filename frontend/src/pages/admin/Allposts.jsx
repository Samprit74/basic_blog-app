
import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
function Allposts() {
  return (
    <>
      <div className='container'>
        <h1 className='text-white mb-4'>All Posts</h1>
        <div className='row'>
          <div className='col-md-4 mb-4 col-lg-4 col-12'>
            <div className='card h-100'>
              <img src="https://static.vecteezy.com/system/resources/previews/033/650/539/non_2x/tokyo-japan-tourism-background-photo.jpg" alt='post image' />
              <div className='card-body'>
                <h5 className='card-title'> My first blog</h5>
                <p className='card-title'> this is  my first blog</p>
              </div>
              <div className='card-footer d-flex justify-content-between'>
                <button className='btn btn-warning' ><FaEdit /> Edit</button>
                <button className='btn btn-danger' ><FaTrashAlt /> Delete</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Allposts
