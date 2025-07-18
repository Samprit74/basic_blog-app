import React from 'react'
import { Link } from 'react-router-dom'
import { FaFileAlt, FaHome, FaPlusCircle, FaUsers } from 'react-icons/fa'

export const Sidebar = () => {
    return (
        <div className='bg-dark text-white vh-100' style={{ width: '228px' }}>
            <div className='p-3'>
                <ul className='nav flex-column'>
                    <li className='nav-item mb-3'>
                        <Link to={'/dashboard'} className='nav-link text-white d-flex align-item-center'>
                            <FaHome className='me-2' />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className='nav-item mb-3'>
                        <Link to={'/dashboard/addpost'} className='nav-link text-white d-flex align-item-center'>
                            <FaPlusCircle className='me-2' />
                            <span>Add Post</span>
                        </Link>
                    </li>
                    <li className='nav-item mb-3'>
                        <Link to={'/dashboard/users'} className='nav-link text-white d-flex align-item-center'>
                            <FaUsers className='me-2' />
                            <span>All user</span>
                        </Link>
                    </li>
                    <li className='nav-item mb-3'>
                        <Link to={'/dashboard/allpost'} className='nav-link text-white d-flex align-item-center'>
                            <FaFileAlt className='me-2' />
                            <span>Posts</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}