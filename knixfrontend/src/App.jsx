import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Friends from "./components/Friends";
import Posts from "./components/Posts";
import Settings from "./components/Settings";
import Login from "./components/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./components/Register";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Navbar /> && location.pathname!== "/register" && <Navbar/>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
