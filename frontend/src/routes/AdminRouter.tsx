import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import OrderManagement from "../screens/admin/OrderManagement/OrderManagement";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<OrderManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
