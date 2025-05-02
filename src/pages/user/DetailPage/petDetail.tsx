import { PetInterface } from "@/store/model/pet";
import { addItemToCart } from "@/store/services/cart/cartSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
  Grid,
  Paper,
} from "@mui/material";
import { Card as AntCard, Tag } from "antd";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const { Meta } = AntCard;

export default function PetDetail({ pet }: { pet: PetInterface }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(pet);
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
  if (!pet) return <Typography>No pet found</Typography>;

  return (
    <Box
      px={{ xs: 2, md: 6 }}
      py={2}
      my={2}
      sx={{ backgroundColor: "#f7f9fc" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <AntCard
            hoverable
            cover={
              <Box sx={{ overflow: "hidden", borderRadius: "8px 8px 0 0" }}>
                <img
                  alt={pet.name}
                  src={pet.image || "/placeholder.jpg"}
                  style={{
                    objectFit: "cover",
                    height: "400px",
                    width: "100%",
                    transition: "transform 0.3s ease",
                  }}
                />
              </Box>
            }
            style={{
              borderRadius: "16px",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            <Meta
              title={
                <Typography variant="h6" fontWeight="bold">
                  {pet.name}
                </Typography>
              }
              description={
                <Typography variant="body2" color="text.secondary">
                  {pet.generic}
                </Typography>
              }
            />

            <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
              <Tag color="blue">{pet.gender}</Tag>
              <Tag color="orange">{pet.color}</Tag>
            </Stack>
          </AntCard>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "white",
              p: 4,
              borderRadius: 4,
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
              height: "100%",
              border: "1px solid rgba(0, 0, 0, 0.03)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              gutterBottom
              sx={{
                borderBottom: "2px solid #3f51b5",
                pb: 1,
                display: "inline-block",
              }}
            >
              {pet.name}
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                color="text.secondary"
                mb={2}
                sx={{ fontStyle: "italic" }}
              >
                {pet.generic}
              </Typography>

              <Chip
                label={`$${pet.price}`}
                color="success"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  boxShadow: "0 2px 10px rgba(76, 175, 80, 0.2)",
                }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.1rem",
                color: "#333",
              }}
            >
              🐾 Thông tin cơ bản:
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" mb={3}>
              <Chip
                label={`Giới tính: ${pet.gender}`}
                color="info"
                sx={{
                  px: 1,
                  borderRadius: "8px",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              />
              <Chip
                label={`Màu sắc: ${pet.color}`}
                color="warning"
                sx={{
                  px: 1,
                  borderRadius: "8px",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              />
              <Chip
                label={`Giá: $${pet.price}`}
                color="success"
                sx={{
                  px: 1,
                  borderRadius: "8px",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              />
            </Stack>

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.1rem",
                color: "#333",
              }}
            >
              📏 Kích thước:
            </Typography>

            <Box
              sx={{
                p: 2,
                backgroundColor: "#f5f8ff",
                borderRadius: 2,
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <Grid container spacing={2} justifyContent="space-around">
                <Grid item xs={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Chiều cao
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {pet.size?.height || "-"} cm
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Cân nặng
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {pet.size?.weight || "-"} kg
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box
              mt={4}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <button
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(63, 81, 181, 0.2)",
                }}
              >
                Tư vấn thông tin
              </button>
              <button
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(63, 81, 181, 0.2)",
                }}
                onClick={() => onClickAddToCart(pet)}
              >
                Thêm vào giỏ hàng
              </button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
