import React from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../axios";
import { loadCommentsForPost } from "../redux/slices/comments";
import { fetchPosts } from "../redux/slices/posts";
import { transormDate } from "../utils/transformDate";
import DeleteButton from "./UI/DeleteButton";

const CommentItem = ({ user, createdAt, text, _id, postId }) => {
  const date = transormDate(createdAt);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const handleClick = async () => {
    try {
      await instance.delete(`posts/${postId}/${_id}`);
      dispatch(loadCommentsForPost(postId));
      dispatch(fetchPosts());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 mb-6 text-base bg-slate-100 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={user?.avatarUrl}
              alt=""
            />
            {user?.fullName}
          </p>
          <p className="text-sm text-gray-600">
            <time
              pubdate="true"
              dateTime="2022-02-08"
              title="February 8th, 2022"
            >
              {date}
            </time>
          </p>
        </div>
        {userData?._id === user?._id && (
          <DeleteButton onClick={handleClick}>Удалить</DeleteButton>
        )}
      </div>
      <p className="text-gray-500">{text}</p>
      <div className="flex items-center mt-4 space-x-4"></div>
    </div>
  );
};

export default CommentItem;
