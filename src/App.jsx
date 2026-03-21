import "./App.css";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import { createBrowserRouter, RouterProvider, Navigate, Link, Outlet } from "react-router";
import UserEdit from "./UserEdit";
import Login from "./Login";
import { AuthProvider, AuthContext } from "./AuthContext";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Layout = () => {
  const { isAuthenticated, logout } = React.useContext(AuthContext);
  
  return (
    <div className="App">
      {isAuthenticated && (
        <ul className="nav-list">
          <li>
            <Link to="/">User List</Link>
          </li>
          <li>
            <Link to="/add-user">Add User</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      )}
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-user",
        element: (
          <ProtectedRoute>
            <UserAdd />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-user/:id",
        element: (
          <ProtectedRoute>
            <UserEdit />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
