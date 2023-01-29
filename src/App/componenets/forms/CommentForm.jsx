import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import instance from "../../axios";
import { loadCommentsForPost } from "../../redux/slices/comments";
import { fetchPosts } from "../../redux/slices/posts";
import MyButtonBlue from "../UI/MyButtonBlue";
import TextAreaForm from "./TextAreaForm.jsx";

const CommentForm = () => {
  const [commentText, setCommentText] = useState("");
  const { id: postId } = useParams();
  const dispatch = useDispatch();

  const handleChange = ({ value }) => {
    setCommentText(value);
  };

  const handleSubmit = async () => {
    try {
      await instance.post(
        `posts/${postId}/createComment`,

        {
          text: commentText,
        }
      );
      setCommentText("");
      dispatch(loadCommentsForPost(postId));
      dispatch(fetchPosts());
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <form className="mb-6">
      <div className=" mb-4 bg-white rounded-lg rounded-t-lg ">
        <TextAreaForm
          label="Введите комментарий"
          name="text"
          value={commentText}
          onChange={handleChange}
        />
      </div>
      <MyButtonBlue onClick={handleSubmit} disabled={!commentText}>
        Sent comment
      </MyButtonBlue>
    </form>
  );
};

export default CommentForm;
