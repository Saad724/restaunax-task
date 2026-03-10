import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AuthLayout from "./layout/AuthLayout";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import UserLayout from "./layout/UserLayout";
import Menu from "./screens/user/Menu/Menu";
import Cart from "./screens/user/Cart/Cart";
import AdminLayout from "./layout/AdminLayout";
import OrderManagement from "./screens/admin/OrderManagement/OrderManagement";

const App = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const isAdmin = userInfo?.role === "admin";
  return (
    <Router>
      <Routes>
        {/* NOT LOGGED IN */}
        {!userInfo && (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        )}

        {/* USER ROUTES */}
        {userInfo && !isAdmin && (
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Menu />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        )}

        {/* ADMIN ROUTES */}
        {userInfo && isAdmin && (
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<OrderManagement />} />
          </Route>
        )}
        <Route path="*" element={<>Route Not Found</>} />
      </Routes>
    </Router>
  );
};

export default App;
