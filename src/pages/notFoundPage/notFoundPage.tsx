import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

const notFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      height="100vh"
      sx={{ background: "#fff3cd", padding: 3 }}
    >
      <PetsIcon sx={{ fontSize: 100, color: "#ff9800" }} />
      <Result
        status="404"
        title="404"
        subTitle="Page not found"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            return to home page
          </Button>
        }
      />
    </Box>
  );
};
export default notFoundPage;
