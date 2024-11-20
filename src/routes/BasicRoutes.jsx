import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Homepage from "../pages/clientSide/homepage/Homepage";
import Component from "../pages/clientSide/ComponentPage/Component";
import Login from "../pages/clientSide/credentialPages/Login";
import Register from "../pages/clientSide/credentialPages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/adminSide/dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AddComponent from "../pages/adminSide/componentRelatedPages/AddComponent";
import ManageComponent from "../pages/adminSide/componentRelatedPages/ManageComponent";
import UpdateComponentForm from "../pages/adminSide/componentRelatedPages/UpdateComponentForm";
import ComponentDetails from "../pages/clientSide/ComponentPage/ComponentDetails";
import AddBackendComponent from "../pages/adminSide/backendComponentRelatedPages/AddBackendComponent";
import ManageBackendComponents from "../pages/adminSide/backendComponentRelatedPages/ManageBackendComponents";
import UpdateBackendComponent from "../pages/adminSide/backendComponentRelatedPages/UpdateBackendComponent";
import AdminComponent from "../pages/clientSide/AdminPanelComponentPage/AdminComponent";
import AdminComponentDetails from "../pages/clientSide/AdminPanelComponentPage/AdminComponentDetails";
import AddCode from "../pages/adminSide/necessaryCodeRelatedPages/AddCode";
import ManageCode from "../pages/adminSide/necessaryCodeRelatedPages/ManageCode";
import UpdateCode from "../pages/adminSide/necessaryCodeRelatedPages/UpdateCode";
import CodeComponent from "../pages/clientSide/NecessaryCodeRelatedPages/CodeComponent";
import CodeDetails from "../pages/clientSide/NecessaryCodeRelatedPages/CodeDetails";



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
        path: "/component-details/:id",
        element: <ComponentDetails></ComponentDetails>
      },
      // admin pannel related routes

      {
        path: "/admin-components",
        element: <AdminComponent></AdminComponent>
      },
      {
        path: "/admin-component-details/:id",
        element: <AdminComponentDetails></AdminComponentDetails>
      },
      // necessary code related routes 
      {
        path: "/necessary-code",
        element: <CodeComponent></CodeComponent>
      },
      {
        path: "/code-details/:id",
        element: <CodeDetails></CodeDetails>
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
      },

      // backend Component related routes 
      {
        path: "add-backendComponent",
        element: <AddBackendComponent></AddBackendComponent>
      },
      {
        path: "manage-backendComponent",
        element: <ManageBackendComponents></ManageBackendComponents>
      },
      {
        path: "update-backendComponent/:id",
        element: <UpdateBackendComponent></UpdateBackendComponent>
      },
      // necessary code related routes 
      {
        path: "add-code",
        element: <AddCode></AddCode>
      },
      {
        path: "manage-code",
        element: <ManageCode></ManageCode>
      },
      {
        path: "update-code/:id",
        element: <UpdateCode></UpdateCode>
      }
    ]
  }
]);
export default router;