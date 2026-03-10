import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import AdminRouter from "./routes/AdminRouter";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AuthLayout from "./layout/AuthLayout";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const isAdmin = userInfo?.role === "admin";
  return (
    <Router>
      <Routes>
        {!userInfo && (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        )}
        <Route path="/" element={<ProtectedRoutes />}>
          {userInfo && !isAdmin && <Route path="/" element={<UserRouter />} />}
          {userInfo && isAdmin && <Route path="/" element={<AdminRouter />} />}
        </Route>
        <Route path="*" element={<>Route Not Found</>} />
      </Routes>
    </Router>
  );
};

export default App;
