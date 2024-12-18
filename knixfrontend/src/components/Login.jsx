import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);

      // Show success toast
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });

      // Store login details in local storage
      const { email, _id } = response.data.user; // Assuming `user` contains user details
      localStorage.setItem("userDetails", JSON.stringify({ email, id: _id }));

      // Navigate to home after successful login
      setTimeout(() => {
        navigate("/"); // Adjust "/home" to your actual home page route
      }, 3000);
    } catch (err) {
      // Show error toast
      const errorMessage = err.response?.data?.error || "Login failed";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-screen">
      <h1 className="appname">KNIX</h1>
      <div className="login-card">
        <h1 className="login-text">LOGIN</h1>
        <div className="login-container">
          <form className="login-form" onSubmit={loginSubmit}>
            <input
              type="email"
              name="email"
              maxLength={30}
              placeholder="Enter Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              maxLength={10}
              placeholder="Enter Your Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">LOGIN</button>
          </form>
          <a href="/register">
            <h6 className="register-link">New To Knix? Register</h6>
          </a>
        </div>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
}
