import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import instance from "../axios";
import {
  fetchAuthMe,
  fetchAuthRegister,
  selectIsAuth,
} from "../redux/slices/auth";
import MyButtonBlue from "./UI/MyButtonBlue";

const Register = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const avatar = watch("avatar");
  const transformData = ({ firstName, lastName, email, password }) => {
    return {
      fullName: `${firstName} ${lastName}`,
      email,
      password,
      avatarUrl,
    };
  };
  useEffect(() => {
    if (avatar?.length) {
      console.log();
      uploadPhoto();
    }
  }, [avatar]);

  const uploadPhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("image", avatar[0]);

      const { data } = await instance.post("/upload", formData);
      setAvatarUrl(`${process.env.REACT_APP_API_URL}${data.url}`);
    } catch (error) {
      console.log("Error of upload the image");
    }
  };

  const onSubmit = async (data) => {
    try {
      const postData = await dispatch(fetchAuthRegister(transformData(data)));
      if (postData.payload?.token) {
        localStorage.setItem("token", postData.payload.token);
      } else {
        alert("Не удалось зарегестрироваться");
      }
    } catch (error) {
      console.log("Ошибка регистрации");
    }
  };
  if (isAuth) {
    return <Navigate to="/posts" />;
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Регистрация
            </h2>
          </div>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-0 md:gap-12">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="flex flex-col items-center">
                        <label className="block text-sm font-medium text-gray-700">
                          Фото
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                            {avatarUrl ? (
                              <img
                                src={avatarUrl}
                                alt="avatar"
                                className=" rounded-full align-middle border-none h-16 w-16 object-cover"
                              />
                            ) : (
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span>
                          <input
                            {...register("avatar")}
                            type="file"
                            className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-3">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Имя
                          </label>
                          <input
                            id="first-name"
                            type="text"
                            {...register("firstName", {
                              required: "Введите имя",
                            })}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                              errors?.firstName && "border-red-600"
                            }`}
                          />
                          <p className="text-red-600">
                            {errors?.firstName?.message}
                          </p>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Фамилия
                          </label>
                          <input
                            id="last-name"
                            type="text"
                            {...register("lastName", {
                              required: "Введите фамилию",
                            })}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                              errors?.lastName && "border-red-600"
                            }`}
                          />
                          <p className="text-red-600">
                            {errors?.lastName?.message}
                          </p>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Электронная почта
                          </label>
                          <input
                            type="text"
                            id="email-address"
                            {...register("email", {
                              required: "Введите email",
                              minLength: {
                                value: 6,
                                message: "Email введен некоректно",
                              },
                            })}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                              errors?.email && "border-red-600"
                            }`}
                          />
                          <p className="text-red-600">
                            {errors?.email?.message}
                          </p>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Пароль
                          </label>
                          <input
                            type="text"
                            {...register("password", {
                              required: "Введите пароль",
                              minLength: {
                                value: 4,
                                message:
                                  "Пароль должен состоять минимум из 5 символов",
                              },
                            })}
                            id="email-address"
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                              errors?.password && "border-red-600"
                            }`}
                          />
                          <p className="text-red-600">
                            {errors?.password?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm my-3 justify-end flex">
                    <Link
                      to="/login/login"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Already have an account? Sign in!
                    </Link>
                  </div>
                  <MyButtonBlue type="submit" disabled={!isValid}>
                    Sign in
                  </MyButtonBlue>
                </form>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
