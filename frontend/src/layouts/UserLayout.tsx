import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Box, Container, Stack, useTheme } from "@mui/material";

const UserLayout = () => {
  const theme = useTheme();
  return (
    <Stack>
      <Header />
      <Box sx={{ backgroundColor: theme.palette.customBackground.main }}>
        <Container
          sx={{ minHeight: "calc(100vh - 130px)", paddingBlock: "20px" }}
        >
          <Outlet />
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          textAlign: "center",
          padding: "20px",
        }}
      >
        © All rights reserved
      </Box>
    </Stack>
  );
};

export default UserLayout;
