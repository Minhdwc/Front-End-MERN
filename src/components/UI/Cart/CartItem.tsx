import * as React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItemInCart,
  getCartByUserId,
} from "@/store/services/cart/cartSlice";
import { AppDispatch } from "@/store/store";

export interface CartItemProps {
  id: string;
  imageUrl: string;
  idItem: string;
  name: string;
  price: number;
  userId: string;
  itemType: "Pet" | "Food" | "Accessory";
  onUpdate?: () => void;
  quantity: number;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
}

const CartItem = ({
  id,
  idItem,
  imageUrl,
  name,
  price,
  userId,
  itemType,
  onUpdate,
  quantity,
  onIncrease,
  onDecrease,
}: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(deleteItemInCart({ userId, id, itemType })).unwrap();
      onUpdate?.();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      borderBottom="1px solid #ddd"
      sx={{
        backgroundColor: "#fafafa",
        borderRadius: "8px",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            marginRight: 16,
            borderRadius: "8px",
          }}
        />
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        sx={{ flex: 1 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          ${price * quantity}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <IconButton
            onClick={() => onDecrease(idItem)}
            sx={{ padding: 0 }}
            disabled={quantity <= 1}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" mx={2}>
            {quantity}
          </Typography>
          <IconButton onClick={() => onIncrease(idItem)} sx={{ padding: 0 }}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={handleDelete} sx={{ padding: 0, ml: 2 }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(CartItem);
