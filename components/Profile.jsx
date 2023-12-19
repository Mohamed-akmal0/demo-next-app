import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, editPost, deletePost }) => {
  return (
    <session className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt-layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => editPost && editPost(post)}
            handleDelete={() => deletePost && deletePost(post)}
          />
        ))}
      </div>
    </session>
  );
};

export default Profile;
