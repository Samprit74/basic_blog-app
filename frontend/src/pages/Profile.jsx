import React from 'react'
import { FaCamera, FaUser } from 'react-icons/fa'

function Profile() {
  return (
    <>
      <div className='profile-container'>
        <h1 className='profile-title'>Update Profile</h1>
        <form className='profile-form'>
          <div className='profile-image-section'>
            <label htmlFor='profile-Image' className='profile-image-label'>

              <img src='https://randomuser.me/api/portraits/women/44.jpg' />

              <div className='profile-placeholde>'>
                <FaUser className='profile-icon' />


              </div>
              <FaCamera className='profile-camera-icon' />
            </label>
            <input type='file'
            id='profileImage'
            accept="image/*"
            className='profile-image-input'
            />
          </div>
          <div className='input-group'>
            <FaUser className='input-icon'/>
            <input type='password'
            id='profileImage'
            accept="image/*"
            className='profile-image-input'
            />
          </div>
        </form>

      </div>
    </>
  )
}

export default Profile
