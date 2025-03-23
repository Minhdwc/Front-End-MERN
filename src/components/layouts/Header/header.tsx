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
<<<<<<< HEAD
import { Button } from "antd";
import { FaSearch } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@/components/UI/Logo";
import AvatarComponent from "@/components/UI/Avatar";
import MenuComponents from "@/components/UI/Menu/MenuComponent";
=======
import { Button, Space } from "antd";
import { FaSearch } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@/components/UI/Logo/Logo";
import AvatarComponent from "@/components/UI/Avatar/Avatar";
>>>>>>> 062d66fdbea9fa18a5efed0a6180e4eaeb5a9d63

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
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "2px solid #ff5722",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Logo image="/logo.png" />
          </Box>

          {/* Menu cho mobile */}
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

          {/* Menu Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <MenuComponents />
          </Box>

          {/* Search & Avatar */}
          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}
          >
            <Tooltip title="Tìm kiếm">
              <Button
                shape="circle"
                icon={<FaSearch />}
                className="btn-header"
              />
            </Tooltip>
            <AvatarComponent />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderComponent;
