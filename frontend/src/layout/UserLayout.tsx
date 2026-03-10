import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Box, Container, Stack } from "@mui/material";

const UserLayout = () => {
  return (
    <Stack>
      <Header />
      <Container sx={{ minHeight: 'calc(100vh - 130px)', paddingBlock: '20px' }}>
        <Outlet />
      </Container>
      <Box sx={{ backgroundColor: '#e6e6e6', textAlign: 'center', padding: '20px'}}>All rights reserved</Box>
    </Stack>
  );
};

export default UserLayout;
