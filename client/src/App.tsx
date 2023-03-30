import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import Explore from "./Pages/Explore/Explore";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import SignIn from "./Pages/SignIn/SignIn";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signout",
          element: <SignIn />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
