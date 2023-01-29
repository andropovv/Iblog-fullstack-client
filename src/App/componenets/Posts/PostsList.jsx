import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostItem from "./PostItem";

const Posts = ({ searchBy, postsOwnerId }) => {
  const { posts } = useSelector((state) => state.posts);
  const isLoadingPosts = posts.status;
  const postsList = posts.items;
  const [sorting] = useState("createdAt");

  let filteredPosts = postsOwnerId
    ? postsList.filter((p) => p.user._id === postsOwnerId)
    : postsList;

  filteredPosts = searchBy
    ? postsList.filter(
        (p) => p.title.toLowerCase().indexOf(searchBy.toLowerCase()) !== -1
      )
    : filteredPosts;

  const sortedPostList = _.orderBy(filteredPosts, [sorting], ["desc"]);

  if (isLoadingPosts === "loading") return <h2>Loading...</h2>;

  return (
    <div className="grid grid-cols-1  gap-4 w-full">
      {sortedPostList.map((post) => (
        <PostItem key={post._id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
