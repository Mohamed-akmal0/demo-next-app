"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt-layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export const Feed = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [post, setPost] = useState([]);
  
  const handleSearch = (e) => {
    e.preventDefault()
    const encodedSearch = encodeURI(search);
    //this will push the search query to router like we do in every professional site
    router.push(`/search?q=${encodedSearch}`)
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/prompt`);
      const data = await res?.json();

      setPost(data);
    };
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSearch} >
        <input
          type="text"
          placeholder="search for a tag or username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};
