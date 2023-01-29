import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../axios";
import Comments from "../Comments";
import Tags from "../Tags";
import MyButtonBlue from "../UI/MyButtonBlue";

const PostPage = () => {
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  async function getPost() {
    try {
      const { data } = await instance.get(`/posts/${id}`);
      setPostData(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {!isLoading && (
        <div className="w-full space-y-8 max-w-5xl bg-white p-6 rounded-lg">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0 mb-6 flex justify-between">
              <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                {postData.title}
              </h2>
              {userData?._id === postData.user._id && (
                <MyButtonBlue onClick={() => navigate("edit")} color="red-600">
                  Edit
                </MyButtonBlue>
              )}
            </div>
            {postData.imageUrl && (
              <img
                src={postData.imageUrl}
                alt="sd"
                className="w-full object-cover lg:rounded"
              />
            )}
          </div>
          <Tags tags={postData.tags} />

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="flex flex-col justify-between  lg:px-0 mt-6 text-gray-700 text-2xl leading-relaxed w-full lg:w-3/4 border-t border-b md:border md:rounded">
              <div className="px-9 py-5">{postData.text}</div>
              <div className="flex justify-between mt-3 px-5 relative bottom-0"></div>
            </div>

            <div className="w-full lg:w-1/4 m-auto mt-6 max-w-screen-sm justify-evenly">
              <div className="p-4 border-t border-b md:border md:rounded">
                <div className="flex py-2">
                  {postData.user.avatarUrl ? (
                    <img
                      className="h-12 w-12 rounded-full mr-2 "
                      src={postData.user.avatarUrl}
                      alt="Rounded avatar"
                    />
                  ) : (
                    <div className="overflow-hidden relative w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-600 mr-2">
                      <svg
                        className="absolute -left-1 w-14 h-14 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          cliRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <div className="font-semibold text-gray-700 text-lg mt-1.5">
                    {" "}
                    {postData.user.fullName}{" "}
                  </div>
                </div>
                {postData.about && (
                  <p className="text-gray-700 py-3">{postData.about}</p>
                )}
              </div>
            </div>
          </div>

          <Comments commentsCount={postData.commentsCount} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
