import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/login";
import Register from "../views/Register";
import BaseLayout from "../views/BaseLayout";
import Home from "../views/Home";
import Profile from "../views/AddProfile";
import Toastify from "toastify-js";
import ReadProfile from "../views/ReadProfile";
import EditProfile from "../views/EditProfile";
import Generate from "../views/Generate";

const base_url = "http://localhost:3000";

const router = createBrowserRouter([
  { path: "/register", element: <Register base_url={base_url} /> },
  {
    path: "/login",
    element: <Login base_url={base_url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "#000000",
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },

  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home base_url={base_url} />,
      },
      {
        path: "/profile-add",
        element: <Profile base_url={base_url} />,
      },
      {
        path: "/profile-read",
        element: <ReadProfile base_url={base_url} />,
      },
      {
        path: "/profile-edit",
        element: <EditProfile base_url={base_url} />,
      },
      {
        path: "/generate-activity",
        element: <Generate base_url={base_url} />,
      },
    ],
  },
]);

export default router;
