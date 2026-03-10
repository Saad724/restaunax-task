import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import AdminRouter from "./routes/AdminRouter";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const isAdmin = userInfo?.role === "admin";
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        {isAdmin && <Route path="/admin/*" element={<AdminRouter />} />}
      </Routes>
    </Router>
  );
};

export default App;
