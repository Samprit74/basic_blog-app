import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { get, Base_url } from "../../services/Endpoint"; // Correct path
import "./Users.css"; // We'll add CSS here
import userDemo from "../../assets/userdemo.jpeg"; // import local default image

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await get("/dashboard/users"); // Backend API to fetch all users
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Delete user:", userId);
      setUsers(users.filter((u) => u._id !== userId)); // Optimistic UI update
    }
  };

  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
    alert(`Edit functionality for user ${userId} coming soon!`);
  };

  return (
    <div className="container">
      <h1 className="text-white mb-4">Users</h1>
      <div className="table-responsive">
        <table className="table table-striped table-dark align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Profile</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={user.profile ? `${Base_url}/images/${user.profile}` : userDemo}
                    alt={user.username}
                    className="user-profile-pic"
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role !== "admin" ? (
                    <>
                      <button
                        className="btn edit-btn me-2"
                        onClick={() => handleEdit(user._id)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
