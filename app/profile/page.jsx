"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/user/${session?.user.id}/post`);
      const data = await res.json();

      setPost(data);
    };
    if (session?.user.id) {
      fetchPost();
    }
  }, [post]);

  const handleEdit = async (posts) => {
    router.push(`/update-post?id=${posts._id}`);
  };

  const handleDelete = async (posts) => {
    const hasConfirmed = confirm(
      "Are you sure , you want to delete this post? "
    );
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${posts._id.toString()}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log("err in handle delete function", error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="welcome to your profile"
      data={post}
      editPost={handleEdit}
      deletePost={handleDelete}
    />
  );
};

export default MyProfile;
