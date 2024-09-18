import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Homepage from "../pages/clientSide/homepage/Homepage";
import Component from "../pages/clientSide/Component/Component";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>
      },
      {
        path: "components",
        element: <Component></Component>
      }
    ]
    },
]);
export default router;