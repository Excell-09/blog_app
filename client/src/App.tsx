import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import SignIn from "./pages/sign-in/SignIn";
import Layout from "./pages/Layout";
import Blog from "./pages/blog/Blog";
import ErrorPage from "./pages/error-page/ErrorPage";
import loaderPreventHasUser from "./loader/loaderPreventHasUser";
import { useSession } from "./context/AuthContext";

function App() {
  const { user } = useSession();

  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      errorElement: <ErrorPage />,
      Component: Layout,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: "/blog/:id",
          Component: Blog,
        },
        {
          path: "/signin",
          Component: SignIn,
          loader: loaderPreventHasUser(user),
        },
        {
          path: "/signup",
          Component: SignUp,
          loader: loaderPreventHasUser(user),
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
