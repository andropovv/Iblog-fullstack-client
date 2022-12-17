import React from "react";
import { useParams } from "react-router-dom";
import PostPage from "../componenets/Pages/PostPage";
import PostsPage from "../componenets/Pages/PostsPage";

const Posts = () => {
  const { id } = useParams();

  return <>{id ? <PostsPage /> : <PostPage />}</>;
};

export default Posts;
