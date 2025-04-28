import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartItemProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  initialQuantity: number;
  check: boolean;
  onQuantityChange: (newQuantity: number) => void;
}

const CartItem = ({
  id,
  imageUrl,
  name,
  price,
  initialQuantity,
  check,
  onQuantityChange,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
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
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ flex: 1 }}
      >
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
        sx={{ textAlign: "right", flex: 1 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          ${price * quantity}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <IconButton onClick={handleDecrease} sx={{ padding: 0 }}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" mx={2}>
            {quantity}
          </Typography>
          <IconButton onClick={handleIncrease} sx={{ padding: 0 }}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
