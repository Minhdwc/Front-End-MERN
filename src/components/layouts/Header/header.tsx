import Logo from "@/components/UI/Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  Box,
  Typography,
  AppBar,
  IconButton,
  Badge,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import {
  BellOutlined,
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import MenuComponent from "@/components/UI/Menu/MenuComponent";
import AvatarComponent from "@/components/UI/Avatar/Avatar";
import CustomIcon from "@/components/UI/Icon/icon";
import { useEffect } from "react";
import { getCartByUserId } from "@/store/services/cart/cartSlice";
import CartDrawer from "@/components/UI/Cart/CartDrawer";

const HeaderComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { cart } = useSelector((state: RootState) => state.cart);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const userId = (userInfo?.data as any)?._id;
    if (userId) {
      dispatch(getCartByUserId(userId));
    }
  }, [(userInfo?.data as any)?._id, cart?.item?.length]);
  const totalQuantity = (cart?.item || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #f0f0f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #fbbf24 0%, #f59e42 100%)",
          textAlign: "center",
          py: 1,
        }}
      >
        <Typography color="white" fontSize={16} fontWeight="bold">
          Pet is my friend 🐶🐱
        </Typography>
      </Box>
      {/* Main Header */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo image="/logo.png" />
        </Box>

        {/* Menu (ẩn ở mobile) */}
        {!isMobile && (
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <MenuComponent />
          </Box>
        )}

        {/* Icon group */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="default">
            <SearchOutlined />
          </IconButton>
          <AvatarComponent />
          <CustomIcon icon={<HeartOutlined />} content="Wishlist" />
          <CustomIcon icon={<BellOutlined />} content="Notifications" />
          <Badge
            badgeContent={totalQuantity}
            color="error"
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <CustomIcon
              icon={<ShoppingCartOutlined />}
              content={<CartDrawer />}
            />
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
