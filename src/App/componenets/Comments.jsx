import React from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./forms/CommentForm";

const Comments = ({ commentsCount }) => {
  return (
    <section className="bg-white  py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion ({commentsCount || 0})
          </h2>
        </div>
        <CommentForm />
        <CommentsList />
      </div>
    </section>
  );
};

export default Comments;
