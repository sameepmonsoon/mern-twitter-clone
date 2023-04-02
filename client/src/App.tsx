import { useState, createContext, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import ProfileLayout from "./Layout/ProfileLayout";
import Error from "./Pages/Error/Error";
import Explore from "./Pages/Explore/Explore";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import SignIn from "./Pages/SignIn/SignIn";
import { renderToString } from "react-dom/server";
import { BsTwitter } from "react-icons/bs";
import { Helmet } from "react-helmet";
export const MyContext = createContext<any>("default");

function App() {
  const [siderState, setSiderState] = useState(false);
  useEffect(() => {
    console.clear(); // clears console on mount
  }, []);

  const StyledCartIcon = () => (
    <BsTwitter size={25} style={{ color: "#2CBCE9" }} />
  );

  // Convert the styled icon to a base64 string
  const cartIconString = renderToString(<StyledCartIcon />);
  const cartIconBase64 = btoa(cartIconString);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },

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
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
    { path: "/profile/:id", element: <ProfileLayout /> },
  ]);

  return (
    <div>
      <MyContext.Provider value={{ siderState, setSiderState }}>
        <Helmet>
          <title>Zwitter</title>
          <link
            rel="icon"
            type="image/svg+xml"
            href={`data:image/svg+xml;base64,${cartIconBase64}`}
          />
          <meta name="description" content="This is a description" />
        </Helmet>
        <RouterProvider router={router}></RouterProvider>
      </MyContext.Provider>
    </div>
  );
}

export default App;
