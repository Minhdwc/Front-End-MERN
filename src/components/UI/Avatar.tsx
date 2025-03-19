import { Tooltip, Avatar, Button } from "antd";
import { Menu, Box, IconButton, Typography, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const menuLoggedIn = [
  { name: "Profile", url: "/profile" },
  { name: "Cart", url: "/cart" },
  { name: "Logout", url: "/logout" },
];
const menuNotLoggedIn = [
  { name: "Login", url: "/auth/login" },
  { name: "Register", url: "/auth/register" },
];

const AvatarComponent = ({ image }: { image?: string }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleChooseItemMenu = (url: string) => {
    navigate(url);
    handleCloseMenu();
  };

  const menu = image ? menuLoggedIn : menuNotLoggedIn;

  return (
    <>
      <Box>
        <Tooltip title="Account">
          <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
            {image ? (
              <Avatar alt="User" src={image} />
            ) : (
              <Button
                icon={<FaRegUser />}
                type="text"
                style={{ color: "#ffffff" }}
              ></Button>
            )}
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "10px" }}
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseMenu}
        >
          {menu.map(({ name, url }) => (
            <MenuItem key={name} onClick={() => handleChooseItemMenu(url)}>
              <Typography textAlign="center">{name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default AvatarComponent;
