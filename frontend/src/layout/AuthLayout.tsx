import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { Stack } from "@mui/material";

const AuthLayout = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  if (userInfo) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <Stack justifyContent={'center'} sx={{ minHeight: '100vh', backgroundColor: '#f7f7f7'}}>
      <Outlet />
    </Stack>
  );
};

export default AuthLayout;
