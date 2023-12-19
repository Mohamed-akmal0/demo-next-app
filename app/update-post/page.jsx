"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "@components/Form";

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  //state
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/prompt/${postId}`);
      const data = await response.json();
        console.log('data' , data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (postId) getPostDetails();
  }, [postId]);

    const updatePost = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if(!postId) return alert('post id is not found')

      try {
        const res = await fetch(`/api/prompt/${postId}`, {
          method: "PATCH",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
          }),
        });
        if (res.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log("error in create post", error);
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handlingSubmit={updatePost}
    />
  );
};

export default EditPost;
