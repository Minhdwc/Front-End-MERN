import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Form, message } from "antd";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddressPicker from "@/components/UI/AddressPicker/AddressPicker";
import DetailRegister from "./DetailRegister";
import authorizedAxiosInstance from "@/ultils/authorAxios";

export default function Register() {
  const [form] = Form.useForm();
  const [address, setAddress] = useState<any>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    if (!address) return message.error("Vui lòng chọn địa chỉ của bạn.");

    try {
      setLoadingAction(true);

      const imageFile = values.image[0]?.originFileObj;
      if (!imageFile) {
        message.error("Vui lòng tải lên ảnh của bạn!");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadResponse = await authorizedAxiosInstance.post(
        "upload/upload",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          transformRequest: [(data: any) => data], // Prevent axios from transforming FormData
        }
      );

      console.log("Upload response:", uploadResponse.data);
      const imageUrl = uploadResponse.data.data.url;

      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        dateOfBirth: values.dateOfBirth.toISOString(),
        image: imageUrl,
        addresses: [
          {
            display_name: address.display_name,
            lat: address.lat,
            lon: address.lon,
            address: address.address,
            isDefault: true,
          },
        ],
      };

      const response = await authorizedAxiosInstance.post(
        "auth/register",
        payload
      );
      console.log(response);
      message.success("Đăng ký thành công!");
      // navigate("/login");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4,
        backgroundColor: "#fff8f4",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Card
          sx={{
            borderRadius: 3,
            backgroundColor: alpha("#FFF3E0", 0.95),
            boxShadow: "0 8px 16px rgba(255, 171, 64, 0.3)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, color: "#FF8A65", mb: 4 }}
            >
              📝 Đăng Ký Tài Khoản
            </Typography>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <div className="space-y-6">
                <DetailRegister />

                <div>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    mb={2}
                    color="#FF7043"
                  >
                    📍 Thông Tin Địa Chỉ
                  </Typography>
                  <AddressPicker onConfirm={setAddress} />
                  {address && (
                    <div className="mt-6 p-5 border border-yellow-300 rounded-lg bg-yellow-50 shadow-sm">
                      <h2 className="text-xl font-semibold text-yellow-700 mb-2 flex items-center">
                        <svg
                          className="w-6 h-6 mr-2 text-yellow-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 12.414m0 0L8.172 7.172m5.242 5.242l5.242 5.242m-5.242-5.242L7.05 7.05"
                          />
                        </svg>
                        Địa chỉ đã chọn:
                      </h2>
                      <p className="text-yellow-900 font-medium">
                        {address.display_name}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  // disabled={loadingAction}
                  sx={{
                    backgroundColor: "#FF7043",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#F4511E",
                    },
                    mt: 2,
                  }}
                  onClick={handleSubmit}
                >
                  {loadingAction ? "Đang đăng ký..." : "Đăng Ký"}
                </Button>

                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    color: "#FF7043",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Đã có tài khoản? Đăng nhập
                </Typography>
              </div>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
