import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../axios";
import { fetchPosts } from "../../redux/slices/posts";
import FileForm from "../forms/FileForm";
import TextAreaForm from "../forms/TextAreaForm.jsx";
import TextForm from "../forms/TextForm";
import MyButtonBlue from "../UI/MyButtonBlue";

const CreatePostPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id: postId } = useParams();

  const [postData, setData] = useState({
    title: "",
    text: "",
    imageUrl: "",
    tags: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getPost() {
    try {
      const { data } = await instance.get(`/posts/${postId}`);
      setData({ ...data, tags: data.tags.join(" ") });
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPost();
  }, []);

  const handleChange = (fieldData) => {
    setData((prevState) => ({
      ...prevState,
      [fieldData.name]: fieldData.value,
    }));
  };

  const handleSubmit = async () => {
    await instance.patch(`/posts/${postId}`, {
      ...postData,
      tags: postData.tags.split(" "),
    });
    dispatch(fetchPosts());
    navigate(`/posts/${postId}`);
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {!isLoading && (
        <div className="w-full space-y-8 max-w-5xl bg-white p-6 rounded-lg">
          <h1 className="text-2xl text-center">Создание поста</h1>
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0 mb-6 w-3/4">
              <TextForm
                name="title"
                onChange={handleChange}
                value={postData.title}
                label="Название поста"
              />
            </div>
            <div className="px-4 lg:px-0 mb-6 flex gap-2 flex-col">
              <FileForm
                label="Изображение"
                name="imageUrl"
                onChange={handleChange}
              />
              {postData.imageUrl && (
                <img
                  alt="Изображение"
                  src={postData.imageUrl}
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
          <div className="px-4 lg:px-0 mb-6 w-3/4">
            <TextForm
              name="tags"
              onChange={handleChange}
              value={postData.tags}
              label="Теги (необязательно)"
            />
          </div>

          <div className="px-4 lg:px-0 mb-6 ">
            <TextAreaForm
              name="text"
              onChange={handleChange}
              value={postData.text}
              label="Текст"
            />
          </div>
          <div className="flex gap-3">
            <MyButtonBlue onClick={handleSubmit}>Опубликовать</MyButtonBlue>
            <button onClick={() => navigate("/posts")}>Назад</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostPage;
