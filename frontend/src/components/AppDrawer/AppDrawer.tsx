import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/AuthSlice";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { getSocket } from "../../socket/socket";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const DRAWER_WIDTH = 240;

const AppDrawer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const socket = getSocket();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userInfo?.role === "admin") {
      socket?.emit("join-admin");
    }
  }, [userInfo]);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Order Managment", path: "/order-management" },
  ];

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {isMobile && (
        <AppBar sx={{ backgroundColor: "#fff" }} elevation={1}>
          <Toolbar>
            <IconButton edge="start" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ py: 2, px: 2 }}>
              <Stack direction={"row"} gap={2}>
                <Typography variant="h6" color="primary">
                  {import.meta.env.VITE_APP_NAME}
                </Typography>
                <Typography variant="h6">Admin</Typography>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ py: 2, px: 2 }}>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Typography variant="h6" color="primary">
              {import.meta.env.VITE_APP_NAME}
            </Typography>
            <Typography variant="h6">Admin</Typography>
            {isMobile && (
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            )}
          </Stack>
        </Box>
        <Stack
          sx={{ paddingBottom: "20px", paddingInline: "20px", flex: 1 }}
          justifyContent={"space-between"}
        >
          <List>
            {navItems.map(({ label, path }) => (
              <ListItemButton
                key={path}
                component={Link}
                to={path}
                selected={location.pathname === path}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
          <PrimaryButton onClick={logoutHandler}>Logout</PrimaryButton>
        </Stack>
      </Drawer>
    </>
  );
};

export default AppDrawer;
