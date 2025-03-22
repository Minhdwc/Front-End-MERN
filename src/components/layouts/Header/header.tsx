import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Tooltip,
  Container,
} from "@mui/material";
import { Button, Space } from "antd";
import { FaSearch } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@/components/UI/Logo/Logo";
import AvatarComponent from "@/components/UI/Avatar/Avatar";

const pages: string[] = ["Products", "Pricing", "Blog"];

const HeaderComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Logo image="/logo.png" />

          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            Where Every Pet Feels at Home!
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Space size="middle">
              <Tooltip title="Tìm kiếm">
                <Button
                  shape="circle"
                  icon={<FaSearch />}
                  className="btn-header"
                />
              </Tooltip>
              <AvatarComponent />
            </Space>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderComponent;
