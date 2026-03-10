import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<>Admin Home</>} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
