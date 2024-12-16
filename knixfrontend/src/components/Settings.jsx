import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [userDetails, setUserDetails] = useState(null);
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to handle modal visibility
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserDetails = JSON.parse(
          localStorage.getItem("userDetails")
        );
        if (!storedUserDetails) {
          console.error("No user details found in localStorage.");
          return;
        }

        // Fetch the full user details
        const response = await axios.get(
          `http://localhost:5000/api/user/${storedUserDetails.id}`
        );
        const user = response.data;
        setUserDetails(user);

        // Fetch friend names based on their object IDs
        const friendsIds = user.friends; // This contains the array of friend IDs
        if (friendsIds.length > 0) {
          const friendsResponse = await axios.post(
            "http://localhost:5000/api/getFriends",
            {
              friendIds: friendsIds,
            }
          );
          setFriendsDetails(friendsResponse.data.friends);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Function to handle logout with confirmation
  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show confirmation modal
  };

  // Confirm logout: clear storage and navigate to login
  const confirmLogout = () => {
    console.log("Logging out...");

    // Clear localStorage
    localStorage.clear();

    // Navigate to the login page
    navigate("/login");
  };

  // Cancel logout: hide modal
  const cancelLogout = () => {
    setShowLogoutModal(false); // Close the modal
  };

  if (!userDetails) {
    return (
      <div className="content-center text-center h-[90vh] w-full text-[5vh] text-textclr">
        Loading...
      </div>
    );
  }

  return (
    <div className="settings-page">
      <h1 className="text-[5vh] font-bold text-center text-textclr w-[60vw] mx-auto relative content-center h-[7vh] mt-[1vh]">
        PROFILE{" "}
        <button
          className="w-[7vh] h-[7vh] flex items-center justify-center absolute top-0 right-0 bg-apptheme rounded-full shadow-neusm"
          onClick={handleLogoutClick} // Show confirmation modal on click
        >
          <i className="fa-solid fa-right-from-bracket text-[3vh]"></i>
        </button>
      </h1>

      <div className="user-details bg-apptheme p-[5vh] rounded-[2vh] shadow-neusm w-[60vw] h-[80vh] mx-auto my-[2vh] ">
        <div className="flex h-[40vh] mb-[5vh] justify-between bg-apptheme shadow-neusmrev p-[3vh] rounded-[2vh]">
          <div className="flex flex-col font-bold text-[3vh] text-textclr items-start justify-between  tracking-wider">
            <p>Name</p>

            <p>Username</p>

            <p>Email</p>

            <p>Phone</p>
            <p>No of Posts</p>
          </div>

          <div className="flex flex-col font-bold text-[3vh] text-textclr items-start justify-between ">
            <p>:</p>

            <p>:</p>

            <p>:</p>

            <p>:</p>
            <p>:</p>
          </div>

          <div className="flex flex-col font-medium text-[3vh] text-textclr items-start justify-between  tracking-wider">
            <p>{userDetails.name}</p>

            <p>{userDetails.username}</p>

            <p>{userDetails.email}</p>

            <p>{userDetails.phone}</p>
            <p>{userDetails.posts.length}</p>
          </div>
        </div>

        <div className="bg-apptheme shadow-neusm p-[3vh] rounded-[2vh]">
          <h3 className="text-[4vh] font-medium text-textclr">Friends</h3>
          <ul className="flex gap-[1vw] mt-[1vh]">
            {friendsDetails.length > 0 ? (
              friendsDetails.map((friend, idx) => (
                <li
                  key={idx}
                  className="friend-item text-[3vh] text-textclr font-medium"
                >
                  {friend.name}
                </li>
              ))
            ) : (
              <li>No friends added yet.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] max-w-[500px]">
            <h2 className="text-[3vh] font-bold mb-4">Confirm Logout</h2>
            <p className="text-[2.5vh] mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                onClick={cancelLogout}
                className="bg-gray-400 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
