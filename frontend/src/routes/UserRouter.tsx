import { Routes, Route } from "react-router-dom";
import Menu from "../screens/user/Menu/Menu";
import UserLayout from "../layout/UserLayout";
import Cart from "../screens/user/Cart/Cart";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
