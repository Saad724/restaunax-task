import { Stack, Typography, useTheme } from "@mui/material";
import AppCard from "../../../components/AppCard/AppCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundColor: theme.palette.customBackground.main,
        minHeight: "100vh",
      }}
    >
      <AppCard
        sx={{
          width: "100%",
          maxWidth: "1200px",
          minHeight: "calc(100vh - 250px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack alignItems={"center"} justifyContent={"center"} sx={{ flex: 1 }} gap={2}>
            <FontAwesomeIcon icon={faFaceSadTear} size="5x" color="rgba(0, 0, 0, 0.38)" />
          <Typography variant="h5" color={"text.disabled"}>Looks like you are lost!</Typography>
          <PrimaryButton onClick={() => navigate(-1)} smallBtn sx={{ width: '100%', maxWidth: '150px'}}>Go back</PrimaryButton>
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default NotFound;
