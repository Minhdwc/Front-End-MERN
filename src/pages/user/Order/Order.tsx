import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import OrderList from "./OrderList";
import AddressPicker from "../../../components/UI/AddressPicker/AddressPicker";

import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Radio,
  FormLabel,
  Button,
} from "@mui/material";
import {
  LocationOn,
  CreditCard,
  AccountBalance,
  AccountBalanceWallet,
  Payment,
} from "@mui/icons-material";

const paymentOptions = [
  {
    value: "cod",
    label: "COD",
    icon: <Payment color="primary" />,
  },
  {
    value: "bank",
    label: "Banking",
    icon: <AccountBalance color="primary" />,
  },
  {
    value: "momo",
    label: "Ví MoMo",
    icon: <AccountBalanceWallet color="secondary" />,
  },
  {
    value: "paypal",
    label: "PayPal",
    icon: <CreditCard color="action" />,
  },
];

const fetchDataProduct = async (id: string, type: string) => {
  try {
    let url = "";
    if (type === "Pet") url = `/pet/get/d=${id}`;
    else if (type === "Accessory") url = `/accessory/get/d=${id}`;
    else url = `/food/get/d=${id}`;
    const response = await authorizedAxiosInstance.get<{ data: Record<string, any> }>(url);
    return (response as any).data?.data || {};
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return {};
  }
};

export default function OrderPage() {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [items, setItems] = useState<any[]>([]);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");

  useEffect(() => {
    const load = async () => {
      if (!cart?.item) return;
      const data = await Promise.all(
        cart.item.map(async (i) => {
          const product = await fetchDataProduct(i.itemId, i.itemType);
          return { ...i, ...product };
        })
      );
      setItems(data);
      setLoading(false);
    };
    load();
  }, [cart]);

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 4, px: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={4} color="primary.main">
        Xác nhận đơn hàng
      </Typography>

      <Grid container spacing={4}>
        {/* DANH SÁCH SẢN PHẨM */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 3, bgcolor: "#ffffff" }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Sản phẩm trong giỏ
            </Typography>

            {loading ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight={200}
              >
                <CircularProgress />
                <Typography ml={2} color="text.secondary">
                  Đang tải đơn hàng...
                </Typography>
              </Box>
            ) : (
              <OrderList items={items} />
            )}
          </Paper>
        </Grid>

        {/* ĐỊA CHỈ + THANH TOÁN */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            {/* ĐỊA CHỈ */}
            <Box display="flex" alignItems="center" mb={2}>
              <LocationOn color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Địa chỉ giao hàng
              </Typography>
            </Box>

            <AddressPicker onConfirm={(data) => setAddress(data)} />

            {address && (
              <Box
                mt={2}
                p={2}
                border="2px dashed #1976d2"
                borderRadius={2}
                bgcolor="#e3f2fd"
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Địa chỉ đã chọn:
                </Typography>
                <Typography color="text.secondary">
                  {address.display_name}
                </Typography>
              </Box>
            )}

            {/* PHƯƠNG THỨC THANH TOÁN */}
            <Divider sx={{ my: 3 }} />
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
              Phương thức thanh toán
            </FormLabel>
            <Grid container spacing={2}>
              {paymentOptions.map((option) => (
                <Grid item xs={12} sm={6} key={option.value}>
                  <Paper
                    elevation={paymentMethod === option.value ? 5 : 1}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      borderRadius: 2,
                      border:
                        paymentMethod === option.value
                          ? "2px solid #1976d2"
                          : "1px solid #ddd",
                      cursor: "pointer",
                      bgcolor:
                        paymentMethod === option.value ? "#e3f2fd" : "#fafafa",
                      transition: "all 0.3s",
                    }}
                    onClick={() => setPaymentMethod(option.value)}
                  >
                    {option.icon}
                    <Typography ml={2} flex={1}>
                      {option.label}
                    </Typography>
                    <Radio
                      checked={paymentMethod === option.value}
                      value={option.value}
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* TỔNG TIỀN */}
            <Divider sx={{ my: 3 }} />
            <div className="w-full bg-gray-100 border rounded-lg p-4 mt-2 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">Tổng cộng:</p>
              <p className="text-2xl font-bold text-blue-600">
                {totalAmount.toLocaleString("vi-VN")}₫
              </p>
            </div>

            {/* NÚT ĐẶT HÀNG */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                fontWeight: 700,
                fontSize: 18,
                py: 1.5,
                mt: 2,
                borderRadius: 2,
              }}
            >
              Đặt hàng ngay
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
