import React, { useState } from "react";
import { AppBar, Box, Container, IconButton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { navbarStyles } from './styles';

// NavItem component
const NavItem = ({ to, icon, label }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <IconButton
      sx={navbarStyles.iconButton}
      component={RouterLink}
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={navbarStyles.link}>
        {icon}
        <Typography variant="body2" sx={{ ...navbarStyles.label, display: hovered ? 'inline' : 'none' }}>
          {label}
        </Typography>
      </Box>
    </IconButton>
  );
};

// Navbar component
const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Container maxWidth={false} sx={navbarStyles.container}>
        <RouterLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <StickyNote2Icon style={{ fontSize: "1.5rem" }} />
        </RouterLink>
        <Box sx={navbarStyles.navItems}>
          <NavItem to="/boards" icon={<DashboardOutlinedIcon />} label="Boards" />
          <NavItem to="/tables" icon={<TableChartOutlinedIcon />} label="Tables" />
        </Box>
      </Container>
    </AppBar>
  </Box>
);

export default Navbar;
