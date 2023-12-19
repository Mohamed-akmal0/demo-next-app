"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  //   const router = useRouter();
  const [post, setPost] = useState([]);

  const handleEdit = async () => {};
  const handleDelete = async () => {};

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/user/${session?.user.id}/post`);
      const data = await res.json();

      setPost(data);
    };
    fetchPost();
  }, []);

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
