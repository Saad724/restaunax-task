import { Routes, Route } from "react-router-dom";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<>Hello User</>} />
      <Route path="*" element={<>User Not Found</>} />
    </Routes>
  );
};

export default UserRouter;
