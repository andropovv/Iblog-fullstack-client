import React from "react";
import Filter from "../Filter";
import PostsList from "../Posts/PostsList";

const PostsPage = () => {
  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-5xl">
          <Filter />
          <PostsList />
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
