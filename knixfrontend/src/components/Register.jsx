import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);

      // Show success toast
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000, // Auto close after 3 seconds
      });

      // Navigate to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      // Show error toast
      toast.error(err.response?.data?.error || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-screen">
      <h1 className="appname">KNIX</h1>
      <div className="register-card">
        <h1 className="register-text">REGISTER</h1>
        <div className="register-container">
          <form className="register-form" onSubmit={registerSubmit}>
            <input
              type="text"
              name="name"
              maxLength={30}
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              maxLength={30}
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              maxLength={10}
              placeholder="Phone No"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              minLength={8}
              maxLength={15}
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              maxLength={20}
              placeholder="Create User Name"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <button type="submit">REGISTER</button>
          </form>
          <a href="/login">
            <h6 className="login-link">Already Register to Knix? Login</h6>
          </a>
        </div>
      </div>

      {/* Toast container for displaying toasts */}
      <ToastContainer />
    </div>
  );
}
