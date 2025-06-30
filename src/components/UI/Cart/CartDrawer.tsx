import { useEffect, useState, useMemo, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Button, Divider, Empty } from "antd";
import { MdPaid, MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import CartItem from "./CartItem";
import {
  deleteCart,
  deleteItemInCart,
  getCartByUserId,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/services/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const CartDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [productData, setProductData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemQuantities, setItemQuantities] = useState<{
    [itemId: string]: number;
  }>({});

  const fetchDataProduct = async (id: string, type: string) => {
    try {
      let url = "";
      if (type === "Pet") {
        url = `/pet/get/d=${id}`;
      } else if (type === "Accessory") {
        url = `/accessory/get/d=${id}`;
      } else {
        url = `/food/get/d=${id}`;
      }
      const response = await authorizedAxiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!cart?.item || cart.item.length === 0) {
      setProductData([]);
      return;
    }
    setLoading(true);
    const fetchAllProducts = async () => {
      try {
        const productPromises = cart.item.map((item) => {
          const id = item.itemId;
          const type = item.itemType;
          return fetchDataProduct(id, type);
        });
        const results = await Promise.all(productPromises);
        setProductData(results.filter((result: any) => result !== null));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [cart?.item]);

  useEffect(() => {
    if (cart?.item) {
      const newQuantities: { [itemId: string]: number } = {};
      cart.item.forEach((item) => {
        newQuantities[item._id] = item.quantity;
      });
      setItemQuantities(newQuantities);
    }
  }, [cart?.item]);

  const handleDeleteItem = async (
    id: string,
    itemType: "Pet" | "Food" | "Accessory"
  ) => {
    if (!cart?.userId) return;
    try {
      const result = await dispatch(
        deleteItemInCart({ userId: cart.userId, id, itemType })
      ).unwrap();
      if (result) {
        dispatch(getCartByUserId(cart.userId));
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleQuantityChange = () => {
    if (cart?.userId) {
      dispatch(getCartByUserId(cart.userId));
    }
  };

  const handleIncrease = useCallback(
    (itemId: string) => {
      if (!cart?.userId) return;
      const item = cart.item.find((i) => i._id === itemId);
      if (!item) return;
      dispatch(
        increaseQuantity({
          userId: cart.userId,
          idItem: itemId,
          itemType: item.itemType,
        })
      );
      setItemQuantities((q) => ({ ...q, [itemId]: (q[itemId] || 1) + 1 }));
    },
    [cart?.userId, cart?.item]
  );

  const handleDecrease = useCallback(
    (itemId: string) => {
      if (!cart?.userId) return;
      const item = cart.item.find((i) => i._id === itemId);
      if (!item || itemQuantities[itemId] <= 1) return;
      dispatch(
        decreaseQuantity({
          userId: cart.userId,
          idItem: itemId,
          itemType: item.itemType,
        })
      );
      setItemQuantities((q) => ({ ...q, [itemId]: q[itemId] - 1 }));
    },
    [cart?.userId, cart?.item, itemQuantities]
  );

  console.log("cha bị rerender");
  const cartItems = useMemo(() => {
    if (!cart?.item || !productData.length) return null;

    return cart.item.map((item) => {
      const product = productData.find(
        (p) => p?.data?._id?.toString() === item.itemId?.toString()
      );
      if (!product) return null;

      return (
        <CartItem
          key={`${item.itemType}-${item.itemId}`}
          id={item.itemId}
          idItem={item._id}
          imageUrl={product.data.image}
          name={product.data.name}
          price={product.data.price}
          userId={cart.userId}
          itemType={item.itemType}
          onUpdate={() => dispatch(getCartByUserId(cart.userId))}
          quantity={itemQuantities[item._id] || item.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      );
    });
  }, [
    cart?.item,
    productData,
    cart?.userId,
    itemQuantities,
    handleIncrease,
    handleDecrease,
  ]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6">Giỏ hàng</Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 1,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : productData.length > 0 ? (
          cartItems
        ) : (
          <Empty description="Bạn chưa có sản phẩm" />
        )}
      </Box>
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          position: "sticky",
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Button
          type="primary"
          icon={<MdPaid />}
          style={{ flex: 1, marginRight: 8 }}
          disabled={productData.length === 0}
          onClick={() => navigate("/order")}
        >
          Đặt hàng
        </Button>
        <Button
          danger
          icon={<MdCancel />}
          style={{ flex: 1, marginLeft: 8 }}
          disabled={productData.length === 0}
          onClick={() => {
            if (cart?.userId) {
              dispatch(deleteCart({ id: cart._id || "" }));
            }
          }}
        >
          Xóa giỏ hàng
        </Button>
      </Box>
    </Box>
  );
};

export default CartDrawer;
