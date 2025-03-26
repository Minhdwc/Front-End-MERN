import Slider from "@/components/UI/Slider/slider";
import { Box, Typography } from "@mui/material";
import { UseSelector } from "react-redux";
import { RootState } from "@/store/store";
export default function home() {
  return (
    <Box>
      <Slider />
      <Typography variant="h5" fontFamily="monospace" fontWeight="bold">
        New Pet
      </Typography>
    </Box>
  );
}
