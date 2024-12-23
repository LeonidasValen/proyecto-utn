import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./layout/Layout.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Error } from "./pages/Error/Error.jsx"
import {Register} from "./pages/Auth/Register.jsx"
import { Login } from "./pages/Auth/Login.jsx"
import { Post } from "./pages/Post/Post.jsx"
import { Write } from "./pages/Write/Write.jsx"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/detailPost/:id",
          element: <Post/>,
        },
        {
          path: "write",
          element: <Write/>,
        }
      ],
    },
    {
      path: "/*",
      element: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
