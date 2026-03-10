import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import AuthLayout from "../layout/AuthLayout";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/menu" element={<>Menu</>} />
      </Route>
      <Route path="*" element={<>User Not Found</>} />
    </Routes>
  );
};

export default UserRouter;
