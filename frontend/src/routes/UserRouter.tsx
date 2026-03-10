import { Routes, Route } from "react-router-dom";
import Menu from "../screens/user/Menu/Menu";
import UserLayout from "../layout/UserLayout";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Menu />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
