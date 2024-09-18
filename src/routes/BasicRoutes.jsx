import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Homepage from "../pages/clientSide/homepage/Homepage";
import Component from "../pages/clientSide/ComponentPage/Component";
import NavbarComponent from "../pages/clientSide/components/navbar/NavbarComponent";



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
      },
      {
        path: "navbar",
        element: <NavbarComponent></NavbarComponent>
      }
    ]
    },
]);
export default router;