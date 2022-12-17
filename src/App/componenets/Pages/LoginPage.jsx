import React from "react";
import { useParams } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";

const LoginPage = () => {
  const { type } = useParams();

  return <>{type === "register" ? <Register /> : <Login />} </>;
};

export default LoginPage;
