import { Tooltip, Avatar, Button } from "antd";
import { Menu, Box, IconButton, Typography, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";

const settingLoggedIn: string[] = ["Profile", "Cart", "Logout"];
const settingNotLoggedIn: string[] = ["Login", "Register"];

const AvatarNotLogged = ({ image }: { image?: string }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const settings = image ? settingLoggedIn : settingNotLoggedIn;

  return (
    <>
      <Box>
        <Tooltip title="Tài khoản">
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default AvatarNotLogged;
