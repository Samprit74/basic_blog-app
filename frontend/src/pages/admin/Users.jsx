import React from 'react'
import { Outlet } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa'
function Users() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@gmail.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Williams', email: 'bob.williams@example.com' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com' },
    { id: 6, name: 'Emily Davis', email: 'emily.davis@example.com' }
  ];
  const handleDelete = (e) => {
    try {
      alert('user deleted event called')
    } catch (err) {
      console.log(err)
      alert('erroe')
    }
  }
  return (
    <>
      <div className='container'>
        <h1 className='text-white mb-4' >users</h1>
        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Action</th>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr scope='row'>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className='btn btn-danger' onClick={handleDelete}><FaTrashAlt /> Delete</button>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>



    </>
  )
}

export default Users
