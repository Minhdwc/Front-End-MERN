import Slider from "@/components/UI/Slider/slider";
import { Box } from "@mui/material";
import { SlideNewPet } from "./SlideNewPet";
import { SlideByCate } from "./slideByCate";

export default function Home() {
  return (
    <Box p={2}>
      <Slider />
      <SlideNewPet />
      <SlideByCate />
    </Box>
  );
}
