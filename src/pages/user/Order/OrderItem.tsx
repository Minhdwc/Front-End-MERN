import { Box, Typography, IconButton, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  image: string;
  name: string;
  itemType: string;
  itemId: string;
  price: number;
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onDelete?: () => void;
};

export default function OrderItem({
  image,
  name,
  itemType,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}: Props) {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 3,
        mb: 2,
        bgcolor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: 80,
          height: 80,
          objectFit: "cover",
          borderRadius: 2,
          boxShadow: 1,
        }}
      />
      <Box flex={1} minWidth={0}>
        <Typography variant="h6" fontWeight={600} noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Loại: <b>{itemType}</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <IconButton
            size="small"
            onClick={onDecrease}
            disabled={quantity <= 1}
            sx={{ border: "1px solid #eee" }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" fontWeight={600}>
            {quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={onIncrease}
            sx={{ border: "1px solid #eee" }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Box textAlign="right" minWidth={100}>
        <Typography variant="subtitle2" color="text.secondary">
          Đơn giá
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {price.toLocaleString()}₫
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" mt={1}>
          Thành tiền
        </Typography>
        <Typography variant="h6" color="primary" fontWeight={700}>
          {(price * quantity).toLocaleString()}₫
        </Typography>
      </Box>
      <IconButton
        color="error"
        onClick={onDelete}
        sx={{ ml: 2, border: "1px solid #ffe0e0", bgcolor: "#fff5f5" }}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}
