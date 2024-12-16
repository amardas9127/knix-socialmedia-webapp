import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Settings from "./components/Settings";
import Login from "./components/Login";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Register from "./components/Register";
import KnixAI from "./components/KnixAi";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [isloggedin, setisloggedin] = useState(false);

  useEffect(() => {
    const getUsr = () => {
      const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
      
      if (storedUserDetails) {
        setisloggedin(true); // Set the login status
      } else {
        setisloggedin(false); // Set to false if user details do not exist
      }
    };

    getUsr(); // Call to fetch user details from localStorage
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Log the userDetails and isLoggedIn state whenever they change
    console.log("Is Logged In:", isloggedin);
  }, [isloggedin]); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      {/* Show Navbar only when not on login or register page */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isloggedin ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/knixai"
          element={isloggedin ? <KnixAI /> : <Navigate to="/login" />}
        />
        <Route
          path="/posts"
          element={isloggedin ? <Posts /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isloggedin ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
