import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Button, Divider, Empty } from "antd";
import { MdPaid, MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import CartItem from "./CartItem";
import { deleteCart, deleteItemInCart } from "@/store/services/cart/cartSlice";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [productData, setProductData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDataProduct = async (id: string, isPet: boolean) => {
    try {
      const url = isPet ? `/pet/get/d=${id}` : `/product/get/d=${id}`;
      const response = await authorizedAxiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return null;
    }
  };

  const loadProductData = async () => {
    setLoading(true);
    const data = await Promise.all(
      (cart?.item || []).map(async (item) => {
        const id = item.idProduct || item.idPet;
        const isPet = !!item.idPet;
        return await fetchDataProduct(id, isPet);
      })
    );
    setProductData(data.filter((item) => item !== null));
    setLoading(false);
  };

  useEffect(() => {
    if (cart?.item?.length) {
      loadProductData();
    } else {
      setProductData([]);
    }
  }, [cart?.item]);

  const handleDeleteItem = (id: string) => {
    dispatch(deleteItemInCart({ userId: cart?.userId ?? "", id }));
  };

  const handleRemoveAll = () => {
    dispatch(deleteCart({ id: cart._id }));
    setProductData([]);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
      }}
    >
      <Divider>Cart</Divider>

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
          productData.map((product, index) => (
            <CartItem
              key={index}
              id={product.data.idPet || product.data.idProduct}
              check={!!product.data.idPet}
              imageUrl={product.data.image}
              name={product.data.name}
              price={product.data.price}
              initialQuantity={cart.item[index]?.quantity}
              onQuantityChange={(newQuantity) => {
                console.log(
                  `Quantity for ${product.data.name} changed to ${newQuantity}`
                );
              }}
              onDelete={() =>
                handleDeleteItem(product.data.idPet || product.data.idProduct)
              }
            />
          ))
        ) : (
          <Empty description="No items in cart" />
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
        >
          Checkout
        </Button>
        <Button
          danger
          icon={<MdCancel />}
          style={{ flex: 1, marginLeft: 8 }}
          disabled={productData.length === 0}
          onClick={handleRemoveAll}
        >
          Remove all
        </Button>
      </Box>
    </Box>
  );
};

export default CartDrawer;
