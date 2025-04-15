import { Box, Tooltip, Typography } from "@mui/material";
import pet from "@/assets/images/cateSlide/pet.jpg";
import petAssessory from "@/assets/images/cateSlide/petAssessory.jpg";
import petFood from "@/assets/images/cateSlide/petFood.jpg";

export function SlideByCate() {
  const categories = [
    { img: pet, name: "Pets" },
    { img: petAssessory, name: "Accessories" },
    { img: petFood, name: "Food" },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        fontFamily="monospace"
        mb={5}
        textAlign="center"
        color="primary"
      >
        Shop By Categories
      </Typography>
      <div className="flex gap-6 justify-center">
        {categories.map((category, index) => (
          <Tooltip key={index} title={category.name} arrow>
            <div className="relative w-40 h-40 rounded-full p-[2px] bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg hover:scale-110 transition-all">
              <div className="w-full h-full overflow-hidden rounded-full bg-white p-1">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </Box>
  );
}
