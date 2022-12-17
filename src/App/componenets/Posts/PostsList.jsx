import React from "react";
import { useSelector } from "react-redux";
import PostItem from "./PostItem";

const Posts = () => {
  const { posts, tags } = useSelector((state) => state.posts);
  const isLoadingPosts = posts.status;
  const postsList = posts.items;

  if (isLoadingPosts === "loading") return <h2>Loading...</h2>;

  return (
    <div className="grid grid-cols-1  gap-4 w-full">
      {postsList.map((post) => (
        <PostItem key={post._id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
