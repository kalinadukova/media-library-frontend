import { Navigate, Outlet } from "react-router";

import { useUserStore } from "../store/user.ts";

const ProtectedRoute = () => {
  const { user } = useUserStore();

  // user is not logged in
  if (!user.id) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
