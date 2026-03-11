import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { logout } from "../../store/slice/AuthSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const appName = import.meta.env.VITE_APP_NAME;

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            fontWeight={"600"}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            {appName}
          </Typography>
          <PrimaryButton
            variant="contained"
            onClick={handleLogout}
            smallBtn
            sx={{ width: "100px" }}
          >
            Logout
          </PrimaryButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
