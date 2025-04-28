import Logo from "@/components/UI/Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Box, Typography, AppBar, IconButton } from "@mui/material";
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
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { cart } = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    if (userInfo?.data) {
      dispatch(getCartByUserId(userInfo.data._id));
    }
  }, [userInfo, cart?.item?.length]);
  const totalQuantity = (cart?.item || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "white" }}>
      <Box className="bg-amber-500 text-center py-1">
        <Typography color="white" fontSize={16} fontWeight="bold">
          Pet is my friend 🐶🐱
        </Typography>
      </Box>
      <Box className="flex justify-between items-center py-2 px-3">
        <Logo image="/logo.png" />

        <Box className="hidden md:flex">
          <MenuComponent />
        </Box>

        <Box className="flex items-center gap-3">
          <IconButton color="default">
            <SearchOutlined />
          </IconButton>
          <AvatarComponent />
          <CustomIcon icon={<HeartOutlined />} content="Wishlist" />
          <CustomIcon icon={<BellOutlined />} content="Notifications" />
          <CustomIcon
            icon={<ShoppingCartOutlined />}
            content={<CartDrawer />}
            number={totalQuantity}
          />
        </Box>
      </Box>
    </AppBar>
  );
};

export default HeaderComponent;
