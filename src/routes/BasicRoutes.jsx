import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Homepage from "../pages/clientSide/homepage/Homepage";
import Component from "../pages/clientSide/ComponentPage/Component";
import NavbarComponent from "../pages/clientSide/components/navbar/NavbarComponent";
import Login from "../pages/clientSide/credentialPages/Login";
import Register from "../pages/clientSide/credentialPages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/adminSide/dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AddComponent from "../pages/adminSide/componentRelatedPages/AddComponent";
import ManageComponent from "../pages/adminSide/componentRelatedPages/ManageComponent";
import UpdateComponentForm from "../pages/adminSide/componentRelatedPages/UpdateComponentForm";



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
  {
    path: "/admin-login",
    element: <Login></Login>
  },
  {
    path: "/admin-register",
    element: <Register></Register>
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path: "add-component",
        element: <AddComponent></AddComponent>
      },
      {
        path: "manage-component",
        element: <ManageComponent></ManageComponent>
      },
      {
        path: "update-component/:id",
        element: <UpdateComponentForm></UpdateComponentForm>
      }
    ]
  }
]);
export default router;