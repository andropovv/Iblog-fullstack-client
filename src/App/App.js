import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import Navbar from "./componenets/Navbar";
import { fetchAuthMe } from "./redux/slices/auth";
import { fetchPosts } from "./redux/slices/posts";
import routes from "./routes";

function App() {
  const renderedRoutes = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-slate-300 h-max">{renderedRoutes}</div>
    </>
  );
}

export default App;
