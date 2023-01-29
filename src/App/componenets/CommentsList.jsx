import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCommentsForPost } from "../redux/slices/comments";
import CommentItem from "./CommentItem";

const CommentsList = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.items);
  const { id: postId } = useParams();

  const sortedComments = _.orderBy(comments, ["createdAt"], ["desc"]);

  useEffect(() => {
    dispatch(loadCommentsForPost(postId));
  }, []);
  return (
    <>
      {comments
        ? sortedComments.map((comment) => (
            <CommentItem key={comment._id} {...comment} />
          ))
        : "Loading..."}
    </>
  );
};

export default CommentsList;
