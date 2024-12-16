import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from "../widgets/PostCard";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (!storedUserDetails) {
          console.error("No user details found in localStorage.");
          return;
        }

        // Fetch full user details from the server
        const response = await axios.get(`http://localhost:5000/api/user/${storedUserDetails.id}`);
        const user = response.data;
        setUserDetails(user);

        // Fetch friends based on their object IDs
        const friendsIds = user.friends; // This contains the array of friend IDs
        if (friendsIds.length > 0) {
          const friendsResponse = await axios.post("http://localhost:5000/api/getFriends", {
            friendIds: friendsIds,
          });
          setFriendsDetails(friendsResponse.data.friends);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []); // This effect runs once when the component mounts

  useEffect(() => {
    const getPosts = async () => {
      try {
        let allPosts = []; // Temporary array to accumulate all posts
        
        // Loop through each friend and fetch their posts
        for (let friend of friendsDetails) {
          const response = await axios.get(`http://localhost:5000/api/getpost?userId=${friend._id}`);
          const posts = response.data.posts;
          allPosts = [...allPosts, ...posts]; // Concatenate the new posts
        }

        // After fetching all posts, update the state once
        setAllPosts(allPosts); // Update state with all posts
        console.log(allPosts); // Log the accumulated posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (friendsDetails.length > 0) {
      getPosts(); // Only fetch posts once friendsDetails is updated
    }
  }, [friendsDetails]); // This effect depends on friendsDetails state

  if (!userDetails) {
    return (
      <div className="content-center text-center h-[90vh] w-full text-[5vh] text-textclr">
        Loading...
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="friends-section bg-apptheme h-[18vh] rounded-[2vh] shadow-neusmrev w-[98vw] mx-auto my-[1vh]">
        <div className="flex overflow-x-auto gap-[1vw] h-[18vh] px-[2vh] items-center">
          {friendsDetails.length > 0 ? (
            friendsDetails.map((friend) => (
              <div
                key={friend._id}
                className="friend-item flex flex-col items-center h-[14vh] w-[12vh] bg-apptheme rounded-[2vh] shadow-neusm justify-center select-none cursor-pointer"
                onClick={() => navigate(`/friendposts/${friend._id}`)} // Navigate to friendposts with friend's _id
              >
                <div className="w-[8vh] h-[8vh] bg-apptheme shadow-neusmrev text-textclr flex items-center justify-center rounded-full text-[4vh] font-bold mb-[1vh]">
                  {friend.name[0].toUpperCase()} {/* Show first letter of friend's name */}
                </div>
                <p className="text-[1.5vh] text-center">{friend.name}</p>
              </div>
            ))
          ) : (
            <p>No friends added yet.</p>
          )}
        </div>
      </div>

      <div>
        {allPosts.length > 0 ? (
          allPosts.map((elem, idx) => (
            <PostCard
              key={idx} // You should use a unique key prop here, using the `ids` from map
              imageurl={elem.imageUrl}
              userimg={elem.username ? elem.username.charAt(0).toUpperCase() : "😀"} // Replace with actual user image if available, e.g., elem.userImg
              username={elem.username || "Not found"} // Replace with actual username if available, e.g., elem.username
              caption={elem.caption} // Replace with actual caption, e.g., elem.caption
            />
          ))
        ) : (
          <p>No posts found for your friends.</p>
        )}
      </div>
    </div>
  );
}
