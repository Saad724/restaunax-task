import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { Stack, useTheme } from "@mui/material";

const AuthLayout = () => {
  const theme = useTheme();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  if (userInfo) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack
      justifyContent={"center"}
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.customBackground.main,
      }}
    >
      <Outlet />
    </Stack>
  );
};

export default AuthLayout;
