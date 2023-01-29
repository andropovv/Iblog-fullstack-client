import { Navigate } from "react-router-dom";
import CreatePostPage from "./componenets/Pages/CreatePostPage";
import LoginPage from "./componenets/Pages/LoginPage";
import MyPostsPage from "./componenets/Pages/MyPostsPage";
import PostPage from "./componenets/Pages/PostPage";
import PostsPage from "./componenets/Pages/PostsPage";
import EditPostPage from "./componenets/Pages/EditPostPage";
import Profile from "./componenets/Profile";

const routes = [
  { path: "/posts", element: <PostsPage /> },
  { path: "/posts/:id", element: <PostPage /> },
  { path: "/posts/:id/edit", element: <EditPostPage /> },
  { path: "/myPosts", element: <MyPostsPage /> },
  { path: "/login/:type", element: <LoginPage /> },
  { path: "/createPost", element: <CreatePostPage /> },
  { path: "/me", element: <Profile /> },
  { path: "/*", element: <Navigate to="/posts" /> },
];

export default routes;
