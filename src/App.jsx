import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "./routes/dashboard/page";
import Layout from "./routes/layout";
import Login from "./routes/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AllVendors from "./pages/AllVendors";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import AdminProductManagement from "./pages/Product";

function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: 'vendors', element: <AllVendors /> },
            { path: 'users', element: <Users /> },
            { path: 'categories', element: <Categories /> },
            { path: 'products', element: <AdminProductManagement /> }
          ],
        },
      ],
    },
    {
      path: "/auth/sign-in",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/auth/sign-in" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
