import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Button, Divider, Empty } from "antd";
import { MdPaid, MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import CartItem from "./CartItem";
import { deleteCart, deleteItemInCart } from "@/store/services/cart/cartSlice";
import { ItemCartInteface } from "@/store/model/cart";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [productData, setProductData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDataProduct = async (id: string, type: string) => {
    try {
      var url = "";
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
      console.error("Failed to fetch product:", error);
      return null;
    }
  };

  const loadProductData = async () => {
    if (!cart?.item) return;

    setLoading(true);
    const productPromises = cart.item.map(async (item: ItemCartInteface) => {
      const id = item.itemId;
      const type = item.itemType;

      if (!type) {
        console.error("Item type is missing:", item);
        return null;
      }

      return fetchDataProduct(id, type);
    });

    try {
      const data = await Promise.all(productPromises);
      setProductData(
        data.filter(
          (item: any): item is NonNullable<typeof item> => item !== null
        )
      );
    } catch (error) {
      console.error("Error loading product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cart?.item?.length) {
      loadProductData();
    } else {
      setProductData([]);
    }
  }, [cart?.item]);

  const handleDeleteItem = (
    id: string,
    itemType: "Pet" | "Food" | "Accessory"
  ) => {
    if (!cart?.userId) return;
    dispatch(deleteItemInCart({ userId: cart.userId, id, itemType }));
  };

  const handleRemoveAll = () => {
    if (!cart?._id) return;
    dispatch(deleteCart({ id: cart._id }));
    setProductData([]);
  };

  const handleOrder = () => {
    navigate("/order");
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
              initialQuantity={cart?.item?.[index]?.quantity || 0}
              onQuantityChange={(newQuantity) => {
                console.log(
                  `Quantity for ${product.data.name} changed to ${newQuantity}`
                );
              }}
              onDelete={() =>
                handleDeleteItem(
                  product.data.idPet || product.data.idProduct,
                  product.data.idPet
                    ? "Pet"
                    : product.data.idProduct.startsWith("food_")
                    ? "Food"
                    : "Accessory"
                )
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
          onClick={handleOrder}
        >
          Đặt hàng
        </Button>
        <Button
          danger
          icon={<MdCancel />}
          style={{ flex: 1, marginLeft: 8 }}
          disabled={productData.length === 0}
          onClick={handleRemoveAll}
        >
          Xóa giỏ hàng
        </Button>
      </Box>
    </Box>
  );
};

export default CartDrawer;
