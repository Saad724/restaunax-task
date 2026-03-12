import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import UserLayout from "./layouts/UserLayout";
import Menu from "./screens/user/Menu/Menu";
import Cart from "./screens/user/Cart/Cart";
import AdminLayout from "./layouts/AdminLayout";
import OrderManagement from "./screens/admin/OrderManagement/OrderManagement";
import Order from "./screens/user/Order/Order";
import { useEffect } from "react";
import { connectSocket } from "./socket/socket";
import Dashboard from "./screens/admin/Dashboard/Dashboard";
import MyOrders from "./screens/user/MyOrders/MyOrders";
import NotFound from "./screens/public/NotFound/NotFound";

const App = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const isAdmin = userInfo?.role === "admin";

  useEffect(() => {
    connectSocket();
  }, []);

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
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="order/:id" element={<Order />} />
          </Route>
        )}

        {/* ADMIN ROUTES */}
        {userInfo && isAdmin && (
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="order-management" element={<OrderManagement />} />
            <Route path="order/:id" element={<Order />} />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
