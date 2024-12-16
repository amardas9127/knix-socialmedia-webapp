import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Settings from "./components/Settings";
import Login from "./components/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./components/Register";
import KnixAI from "./components/KnixAI";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only when not on login or register page */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knixai" element={<KnixAI />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/settings" element={<Settings />} />
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
