import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import Navbar from "./componenets/Navbar";
import { fetchPosts } from "./redux/slices/posts";
import routes from "./routes";

function App() {
  const renderedRoutes = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      <Navbar />

      {renderedRoutes}
    </>
  );
}

export default App;
