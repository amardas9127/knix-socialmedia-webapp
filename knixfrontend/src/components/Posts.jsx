import React from "react";
import PostCard from "../widgets/PostCard";

export default function Posts() {
  return (
    <div className="flex w-full min-h-[100vh] flex-col">
      <div className="bg-apptheme mt-[3vh] text-[4vh] mx-auto text-textclr font-medium py-[.5vh] shadow-neusm rounded-full text-center content-center px-[3vw]">
        Recent posts
      </div>
      <PostCard
        imageurl={
          "https://images.unsplash.com/photo-1480044965905-02098d419e96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        userimg={"A"}
        username={"AmarDas888"}
        caption={"nice bird good nice bird"}
      />
    </div>
  );
}
