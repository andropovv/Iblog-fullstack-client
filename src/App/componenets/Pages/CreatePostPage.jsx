import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import instance from "../../axios";
import { fetchPosts } from "../../redux/slices/posts";
import FileForm from "../forms/FileForm";
import TextAreaForm from "../forms/TextAreaForm.jsx";
import TextForm from "../forms/TextForm";
import MyButtonBlue from "../UI/MyButtonBlue";
import * as yup from "yup";

const CreatePostPage = () => {
  const [errors, setErrors] = useState({});
  const [postData, setData] = useState({
    title: "",
    text: "",
    imageUrl: "",
    tags: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateScheme = yup.object().shape({
    title: yup.string().required("Введите название поста"),
    text: yup.string().required("Введите текст поста"),
  });

  const validate = () => {
    validateScheme
      .validate(postData)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [postData]);

  const handleChange = (fieldData) => {
    setData((prevState) => ({
      ...prevState,
      [fieldData.name]: fieldData.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isValid) {
        const { data } = await instance.post("/posts", {
          ...postData,
          tags: postData.tags.split(" "),
        });
        dispatch(fetchPosts());
        navigate(`/posts/${data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            <p className="text-red-600">{errors?.title}</p>
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
          <p className=" text-red-600">{errors?.text}</p>
        </div>
        <div className="flex gap-3">
          <MyButtonBlue onClick={handleSubmit} disabled={!isValid}>
            Опубликовать
          </MyButtonBlue>
          <button onClick={() => navigate("/posts")}>Назад</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
