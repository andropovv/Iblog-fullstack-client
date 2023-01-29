import React from "react";
import { Link } from "react-router-dom";
import { transormDate } from "../../utils/transformDate";
import CommentIcon from "../assets/icons/CommentIcon";

const PostItem = ({
  title,
  text,
  createdAt,
  user,
  imageUrl,
  _id,
  commentsCount,
}) => {
  const date = transormDate(createdAt);
  return (
    <div className="p-6 bg-white rounded-xl">
      <Link className="group" to={_id}>
        {imageUrl && (
          <div className="overflow-hidden">
            <img
              src={imageUrl}
              className="w-full h-auto hover:scale-105 transition transition-all duration-200 ease-in-out"
              alt="Sample Cover"
            />
          </div>
        )}

        <h3
          className="mt-6 leading-normal text-gray-800 group-hover:text-purple-400 font-semibold text-2xl lg:text-4xl line-clamp-3 transition translation-all duration-200 ease-in-out"
          title="Lorem Ipsum is simply dummy text of the printing"
        >
          {title}
        </h3>
      </Link>

      <div className="mt-6">
        <div className="flex justify-between">
          <Link className="flex items-center">
            {user.avatarUrl ? (
              <img
                className="w-10 h-10 rounded-full"
                src={user.avatarUrl}
                alt="Rounded avatar"
              />
            ) : (
              <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute -left-1 w-12 h-12 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clirule="evenodd"
                  ></path>
                </svg>
              </div>
            )}

            <span className="ml-2 text-gray-600 text-xl font-semibold">
              {user.fullName}
            </span>
          </Link>
          <time className="text-gray-600 text-xl" dateTime={createdAt}>
            {date}
          </time>
        </div>

        <p className="mt-6 leading-normal line-clamp-3 text-xl text-gray-600">
          {text}
        </p>
      </div>

      {/* <Link className="inline-block mt-6 text-purple-500 hover:text-purple-400">
        Read More
      </Link> */}
      <div className="flex justify-between mt-3">
        <Link className="text-gray-600 hover:text-purple-400  py-3 text-center text-xl">
          <div className="flex gap-2">
            <CommentIcon /> {commentsCount || 0}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
