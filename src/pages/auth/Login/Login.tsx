import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "@/store/services/user/userSlice";
import { AppDispatch } from "@/store/store";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Form, Input, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { UserInterface } from "@/store/model/user";
import "@/components/sass/login.sass";
import {
  addItemToCart,
  getCartByUserId,
} from "@/store/services/cart/cartSlice";
import { PetInterface } from "@/store/model/pet";

interface LoginResponse {
  accessToken: string;
  user: UserInterface;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingAction, setLoadingAction] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const from = location.state?.from || "/";
  const pet = location.state?.pet as PetInterface;

  const onFinish = async (values: { email: string; password: string }) => {
    setLoadingAction(true);
    try {
      const response = await authorizedAxiosInstance.post<LoginResponse>(
        "auth/login",
        values
      );

      const accessToken = response.data.data.userLogged.accessToken;
      if (!accessToken) {
        throw new Error("Invalid token response");
      }

      localStorage.setItem("accessToken", accessToken);
      await dispatch(getUsers());

      if (pet) {
        const userInfo = await dispatch(getUsers()).unwrap();
        if (userInfo?.data?._id) {
          await dispatch(addItemToCart({ userId: userInfo.data._id, pet }));
          await dispatch(getCartByUserId(userInfo.data._id));
          message.success("✅ Đã thêm vào giỏ hàng");
        }
      }

      message.success("Login successful!");
      navigate(from);
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Invalid email or password!"
      );
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: alpha("#FFF3E0", 0.95),
            boxShadow: "0 8px 16px rgba(255, 171, 64, 0.3)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "#FF8A65",
              }}
            >
              🐶 Welcome Back!
            </Typography>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!!" }]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "#FF8A65" }} />}
                  placeholder="Your email"
                  size="large"
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(255, 138, 101, 0.4)",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#FF8A65" }} />}
                  placeholder="Password"
                  size="large"
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(255, 138, 101, 0.4)",
                  }}
                />
              </Form.Item>

              <Box textAlign="center" mb={3}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#FF7043",
                    cursor: "pointer",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot password?
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                disabled={loadingAction}
                sx={{
                  backgroundColor: "#FF7043",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 12,
                  "&:hover": {
                    backgroundColor: "#F4511E",
                  },
                  position: "relative",
                  "&::after": {
                    content: `"🐾"`,
                    position: "absolute",
                    right: 20,
                    top: 12,
                    fontSize: 18,
                  },
                }}
              >
                {loadingAction ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Login;
