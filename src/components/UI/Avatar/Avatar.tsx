import { Tooltip, Avatar, Spin } from "antd";
import { Menu, Box, IconButton, Typography, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const menuLoggedIn = [
  { name: "Profile", url: "/profile" },
  { name: "Cart", url: "/cart" },
  { name: "Logout", url: "/logout" },
];
const menuNotLoggedIn = [
  { name: "Login", url: "/auth/login" },
  { name: "Register", url: "/auth/register" },
];

const AvatarComponent = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user.userInfo);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleChooseItemMenu = (url: string) => {
    if (url === "/logout") {
      setLoading(true);
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 1000);
    } else {
      navigate(url);
    }
    handleCloseMenu();
  };
  return (
    <Box>
      <Tooltip title="Account">
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          {user?.data ? (
            <Avatar alt="User" src={user.data.image} />
          ) : (
            <FaRegUser style={{ fontSize: 24, color: "#ffffff" }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "10px" }}
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseMenu}
      >
        {loading ? (
          <MenuItem disabled>
            <Spin size="small" style={{ marginRight: 8 }} />
            <Typography textAlign="center">Đang đăng xuất...</Typography>
          </MenuItem>
        ) : (
          (user ? menuLoggedIn : menuNotLoggedIn).map(({ name, url }) => (
            <MenuItem key={name} onClick={() => handleChooseItemMenu(url)}>
              <Typography textAlign="center">{name}</Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default AvatarComponent;
