import React from "react";
import { Link } from "react-router-dom";
import { transormData } from "../../utils/transformData";

const PostItem = ({
  title,
  text,
  updatedAt,
  tags,
  user,
  imageUrl,
  avatarUrl,
}) => {
  const data = transormData(updatedAt);
  return (
    <div className="p-6 bg-white rounded-xl">
      <Link className="group">
        {imageUrl && (
          <div className="overflow-hidden">
            <img
              src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/HS2SVGZLLNJDBPLJ5OYK7KHBRQ.jpg"
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
            <div className="h-8 w-8 rounded-full bg-purple-400 bg-[url('')]"></div>

            <span className="ml-2 text-gray-600 text-lg">{user.fullName}</span>
          </Link>
          <time className="text-gray-600 text-lg" dateTime={updatedAt}>
            {data}
          </time>
        </div>

        <p className="mt-6 leading-normal line-clamp-3 text-xl text-gray-600">
          {text}
        </p>
      </div>

      <Link className="inline-block mt-6 text-purple-500 hover:text-purple-400">
        Read More
      </Link>
      <Link className="inline-block text-gray-600 hover:text-purple-400 w-full py-3 text-center text-lg">
        10000 <img src="../../assets/like.svg" />
      </Link>
    </div>
  );
};

export default PostItem;
