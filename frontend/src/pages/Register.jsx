import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userDemo from "../assets/userdemo.jpeg"; // import default profile pic

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "user",
  });
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("userType", formData.userType);

      // If user uploaded a file, use it; otherwise use default image
      if (profile) {
        data.append("profile", profile);
      } else {
        // Convert imported image to Blob
        const response = await fetch(userDemo);
        const blob = await response.blob();
        data.append("profile", blob, "userdemo.jpeg");
      }

      const res = await axios.post("http://localhost:7000/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* ... rest of your form inputs ... */}
        </form>
      </div>
    </div>
  );
}

export default Register;
