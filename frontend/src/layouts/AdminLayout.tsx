import { Outlet } from "react-router-dom";
import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { getSocket } from "../socket/socket";
import AppDrawer from "../components/AppDrawer/AppDrawer";


const AdminLayout = () => {
  const theme = useTheme();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const socket = getSocket();
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    if (userInfo?.role === "admin") {
      socket?.emit("join-admin");
    }
  }, [userInfo]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppDrawer />
      <Box
        sx={{
          backgroundColor: theme.palette.customBackground.main,
          p: 3,
          minHeight: "100vh",
          width: "100%",
          ...(isMobile && {paddingTop: '90px'})
        }}
      >
        <Box
          component="main"
          sx={{
            maxWidth: "1440px",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
