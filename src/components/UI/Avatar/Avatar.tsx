import { Tooltip, Avatar } from "antd";
import { Menu, Box, IconButton, Typography, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearUser } from "@/store/services/user/userSlice";
import { persistor } from "@/store/store";
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
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userInfo);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleChooseItemMenu = (url: string) => {
    if (url === "/logout") {
      localStorage.removeItem("accessToken");
      dispatch(clearUser());
      persistor.purge();
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
            <FaRegUser style={{ fontSize: 24, color: "#000" }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "10px" }}
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseMenu}
      >
        {(user ? menuLoggedIn : menuNotLoggedIn).map(({ name, url }) => (
          <MenuItem key={name} onClick={() => handleChooseItemMenu(url)}>
            <Typography textAlign="center">{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AvatarComponent;
