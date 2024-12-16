import React, { useState, useEffect } from "react";
import PostCard from "../widgets/PostCard";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the friend's ID from the route

export default function FriendsPost() {
  const { id } = useParams(); // Get the friend's ID from the route
  const [posts, setPosts] = useState([]); // State to store friends' posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!id) {
          console.error("No friend ID found in the route.");
          return;
        }

        // Fetch posts of the specific friend using the ID from the URL
        const response = await axios.get(
          `http://localhost:5000/api/getpost?userId=${id}` // Adjust API as per your backend logic
        );
        
        setPosts(response.data.posts || []); // Ensure data is properly set
        console.log(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call fetchPosts when the component mounts
  }, [id]); // Add 'id' as a dependency so it runs again if the route changes

  return (
    <div className="flex w-full min-h-[100vh] flex-col">
      <div className="bg-apptheme mt-[3vh] text-[4vh] mx-auto text-textclr py-[.5vh] shadow-neusm font-bold rounded-full text-center content-center px-[3vw]">
        FRIEND'S POSTS
      </div>

      {/* Conditional rendering to show posts if available */}
      {posts.length > 0 ? (
        posts.map((elem, index) => (
          <PostCard
            key={elem._id || index} // Use unique identifier (assuming elem._id exists)
            imageurl={elem.imageUrl}
            userimg={elem.username ? elem.username.charAt(0).toUpperCase() : "😀"} // Display initials if user image is unavailable
            username={elem.username || "Unknown"} // Fallback for missing username
            caption={elem.caption} // Display caption
          />
        ))
      ) : (
        <div className="text-center mt-10 text-gray-500">No posts found</div>
      )}
    </div>
  );
}
    