import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/AuthSlice";

const DRAWER_WIDTH = 240;

const AdminLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch()

  const navItems = [{ label: "Order Managment", path: "/" }];

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
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
          <Stack direction={"row"} gap={2}>
            <Typography variant="h6" color="primary">
              {import.meta.env.VITE_APP_NAME}
            </Typography>
            <Typography variant="h6">Admin</Typography>
          </Stack>
        </Box>
        <Stack
          sx={{ paddingBottom: "20px", paddingInline: '20px', flex: 1 }}
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
      <Box
        component="main"
        sx={{
          p: 3,
          minHeight: "100vh",
          width: '100%',
          maxWidth: '2560px'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
