import LikedPostsPage from "./componenets/Pages/LikedPostsPage";
import LoginPage from "./componenets/Pages/LoginPage";
import MyPostsPage from "./componenets/Pages/MyPostsPage";
import PostsPage from "./componenets/Pages/PostsPage";

const routes = [
  { path: "/:id?", element: <PostsPage /> },
  { path: "/myPosts", element: <MyPostsPage /> },
  { path: "/liked", element: <LikedPostsPage /> },
  { path: "/login/:type", element: <LoginPage /> },
  { path: "/", element: <PostsPage /> },
];

export default routes;
