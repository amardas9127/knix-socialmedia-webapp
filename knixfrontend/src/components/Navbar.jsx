import React, { useState, useEffect } from "react";
import "../styles/Navbar.css"
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    // console.log("Stored Data:", storedData); // Debug raw data

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // console.log("Parsed Data:", parsedData); // Debug parsed object

        if (parsedData.id) {
          setUserId(parsedData.id);
          console.log("User ID:", userId); // Debug user ID
        } else {
          console.error("User ID not found in localStorage data");
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/search-users?query=${e.target.value}`
        );
        setSearchResults(response.data);
      } catch (err) {
        console.error("Error fetching search results", err);
      }
    } else {
      setSearchResults([]);
    }
  };

  const addFriend = async (friendId) => {
    console.log("Current User ID:", userId); // Debug logged-in user ID
    console.log("Friend ID to add:", friendId); // Debug friend ID to add

    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/add-friend", {
        userId,
        friendId,
      });
      alert(response.data.message);
    } catch (err) {
      console.error("Error adding friend", err);
      const errorMessage = err.response?.data?.error || "Failed to add friend";
      alert(errorMessage);
    }
  };

  // Remove friend function
  const removeFriend = async (friendId) => {
    console.log(userId);
    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/remove-friend", {
        userId,
        friendId,
      });
      alert(response.data.message);
    } catch (err) {
      console.error("Error removing friend", err);
      const errorMessage =
        err.response?.data?.error || "Failed to remove friend";
      alert(errorMessage);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar-main">
        <NavLink to="/">
          <div className="app-name">Knix</div>
        </NavLink>
        <div className="search-container">
          <input
            className="search-box text-[2.5vh]"
            type="text"
            maxLength={40}
            placeholder="Search......."
            value={searchTerm}
            onChange={handleSearch}
          />

          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults
                .filter((user) => user._id !== userId) // Exclude the current user
                .slice(0, 5)
                .map((user) => (
                  <div key={user._id} className="search-result-item">
                    <span className="user-name">{user.name}</span>

                    {Array.isArray(user.friends) &&
                    user.friends.includes(userId) ? (
                      <button
                        className="remove-friend-btn"
                        onClick={() => removeFriend(user._id)} // Call removeFriend
                      >
                        Remove Friend
                      </button>
                    ) : (
                      <button
                        className="add-friend-btn"
                        onClick={() => addFriend(user._id)} // Call addFriend
                      >
                        Add Friend
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="menu-container">
          <NavLink to="/">
            <div className="menu-icons-container home">
              <i className="fa-solid fa-house"></i>
            </div>
          </NavLink>
          <NavLink to="/posts">
            <div className="menu-icons-container posts">
              <i className="fa-solid fa-images"></i>
            </div>
          </NavLink>
          <NavLink to="/knixai">
            <div className="menu-icons-container settings">
            <i className="fa-solid fa-comment"></i>
            </div>
          </NavLink>
          <NavLink to="/settings">
            <div className="menu-icons-container settings">
              <i className="fa-solid fa-user"></i>
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
