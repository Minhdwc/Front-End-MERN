import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { getAllPet } from "@/store/services/pet/petSlice";
import { addItemToCart } from "@/store/services/cart/cartSlice";
import {
  Typography,
  Card as MUICard,
  CardMedia,
  IconButton,
  Stack,
  Tooltip,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Slider from "react-slick";
import { PetInterface } from "@/store/model/pet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster, toast } from "react-hot-toast";
import { Card as AntCard } from "antd";
const { Meta } = AntCard;

export function SlideNewPet() {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector((state: RootState) => state.pet);
  const user = useSelector((state: RootState) => state.user);

  const eightLatestPets = pets.data.slice(0, 8);
  const navigate = useNavigate();
  const location = useLocation();
  const onClickAddToCart = async (pet: PetInterface) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/auth/login", { state: { from: location.pathname } });
      return;
    }
    try {
      const idUser = user.userInfo.data._id;
      await dispatch(addItemToCart({ userId: idUser, pet }));

      toast.success("✅ Pet added to cart!", {
        position: "top-right",
        duration: 3000,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const onClickDetailHandle = async (id: string) => {
    navigate(`/detail/pet_${id}`);
  };
  useEffect(() => {
    dispatch(getAllPet());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Toaster />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Typography
        variant="h4"
        fontWeight="bold"
        fontFamily="monospace"
        mb={3}
        textAlign="center"
        color="primary"
      >
        🐾 New Pets
      </Typography>

      <Slider {...settings}>
        {eightLatestPets.map((pet: PetInterface, index: number) => (
          <Box px={2} key={index}>
            <MUICard
              sx={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: 6,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 10,
                },
                "&:hover .overlay": {
                  opacity: 1,
                  visibility: "visible",
                },
                "&:hover .blur-layer": {
                  backdropFilter: "blur(3px)",
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={pet.image || "/placeholder.jpg"}
                  alt={pet.name || "Unnamed Pet"}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "300px",
                  }}
                />

                <Box
                  className="blur-layer"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 2,
                    transition: "all 0.3s ease",
                  }}
                />
              </Box>

              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 3,
                  opacity: 0,
                  visibility: "hidden",
                  transition: "all 0.3s ease",
                  px: 2,
                  py: 2,
                  background: "rgba(255,255,255,0.4)",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <Meta
                  title={
                    <div>
                      <Typography fontWeight="bold">
                        {pet.name} - {pet.generic}
                      </Typography>
                      <Typography fontWeight="bold" color="secondary">
                        {pet.price}$
                      </Typography>
                    </div>
                  }
                  description={
                    <Stack
                      direction="row"
                      justifyContent="center"
                      gap={2}
                      mt={1}
                    >
                      <Tooltip title="Add to cart">
                        <IconButton
                          color="primary"
                          sx={{ bgcolor: "#e3f2fd" }}
                          onClick={() => onClickAddToCart(pet)}
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View details">
                        <IconButton
                          color="info"
                          sx={{ bgcolor: "#e1f5fe" }}
                          onClick={() => onClickDetailHandle(pet._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add to Wishlist">
                        <IconButton color="error" sx={{ bgcolor: "#ffebee" }}>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              </Box>
            </MUICard>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
