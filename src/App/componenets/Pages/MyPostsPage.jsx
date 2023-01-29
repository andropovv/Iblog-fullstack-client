import React, { useState } from "react";
import Search from "../Search";
import PostsList from "../Posts/PostsList";
import MyButtonBlue from "../UI/MyButtonBlue";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyPostsPage = () => {
  const me = useSelector((state) => state.auth.data);

  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  const handleSearchChange = (data) => {
    setSearchVal(data);
  };

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-5xl">
          <div className="flex gap-3">
            <MyButtonBlue onClick={() => navigate("/createPost")}>
              Create new post
            </MyButtonBlue>
            <Search value={searchVal} onChange={handleSearchChange} />
          </div>
          {me && <PostsList searchBy={searchVal} postsOwnerId={me._id} />}
        </div>
      </div>
    </div>
  );
};

export default MyPostsPage;
