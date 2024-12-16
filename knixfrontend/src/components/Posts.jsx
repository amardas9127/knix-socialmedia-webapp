import React, { useState,useEffect } from "react";
import PostCard from "../widgets/PostCard";
import axios from "axios";

export default function Posts() {
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null); // Store the file object
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log(userDetails.id);
        
        // Get the userId from localStorage
        if (!userDetails.id) {
          console.error('No user ID found in localStorage');
          return;
        }
        
        const response = await axios.get(`http://localhost:5000/api/getpost?userId=${userDetails.id}`); // Adjust the URL as per your backend route
        setPosts(response.data.posts);
        console.log(posts);
        // Store the fetched posts in state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      
    };

    fetchPosts();// Call the function when the component mounts
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the actual file object for uploading
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handlePostSubmit = async () => {
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }
  
    // Your Cloudinary credentials
    const cloudName = "dv4y23tbj"; // Replace with your actual cloud name
    const uploadPreset = "knix_posts"; // Replace with your actual upload preset
  
    const formData = new FormData();
    formData.append("file", imageFile); // Use the actual file object
    formData.append("upload_preset", uploadPreset); // Preset for Cloudinary
  
    try {
      // Upload the image to Cloudinary
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const imageUrl = result.secure_url;
        console.log("Image uploaded successfully: ", imageUrl);
  
        // Retrieve user details from localStorage
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  
        if (userDetails && userDetails.id) {
          // Now save the post (image URL and caption) to MongoDB
          const postResponse = await fetch("http://localhost:5000/api/addPost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userDetails.id,
              imageUrl,
              caption,
            }),
          });
  
          const postResult = await postResponse.json();
  
          if (postResponse.ok) {
            console.log("Post saved successfully in MongoDB:", postResult);
            window.location.reload();
          } else {
            console.error("Error saving post to MongoDB:", postResult.message);
            alert("Failed to save post to MongoDB.");
          }
  
          // Close modal after submission
          setShowModal(false);
        } else {
          alert("User not found in localStorage. Please ensure user is logged in.");
        }
      } else {
        console.error("Image upload failed: ", result.error.message);
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("There was an error uploading the image.");
    }
  };

  
  

  return (
    <div className="flex w-full min-h-[100vh] flex-col">
      <div className="bg-apptheme mt-[3vh] text-[4vh] mx-auto text-textclr py-[.5vh] shadow-neusm font-bold rounded-full text-center content-center px-[3vw]">
        MY POSTS
      </div>
      {posts.map((elem, ids) => {
  return (
    <PostCard
      key={ids} // You should use a unique key prop here, using the `ids` from map
      imageurl={elem.imageUrl}
      userimg={elem.username ? elem.username.charAt(0).toUpperCase() : "😀"} // Replace with actual user image if available, e.g., elem.userImg
      username={elem.username || "Not found"} // Replace with actual username if available, e.g., elem.username
      caption={elem.caption} // Replace with actual caption, e.g., elem.caption
    />
  );
})}


      {/* Plus button to open modal */}
      <button
        onClick={handleModalToggle}
        className="bg-apptheme text-textclr shadow-neusm h-[6vh] w-[6vh] rounded-full flex justify-center items-center fixed bottom-[5vh] right-[5vh]"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] max-w-[500px]">
            <h2 className="text-[3vh] font-medium mb-4">Create a Post</h2>

            <div className="mb-4">
              <label className="block mb-2">Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Caption:</label>
              <input
                type="text"
                value={caption}
                onChange={handleCaptionChange}
                placeholder="Enter caption"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleModalToggle}
                className="bg-red-400 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handlePostSubmit}
                className="bg-green-400 text-white py-2 px-4 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
