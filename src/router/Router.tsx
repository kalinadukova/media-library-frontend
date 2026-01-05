import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register/Register.tsx";
import Login from "../pages/Login/Login.tsx";
import MainLayout from "../ui/layouts/MainLayout/MainLayout.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";

const Router = () => {
  return (
    <Routes>
      {/* public routes */}
      {/* TODO: add layout */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<h1>404 Not Found</h1>} />
      {/* This is the layout for the private routes */}
      {/* TODO: create layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* private routes */}
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
