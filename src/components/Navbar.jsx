import React from "react";
import { AppBar, Box, Container, IconButton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

const iconButtonStyle = {
  width: "3rem",
  height: "3rem",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  color: "black",
  "&:hover": {
    width: "6rem",
    borderRadius: "20px",
    backgroundColor: "white",
  },
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
};

const labelStyle = {
  ml: 0.5,
  display: "none",
  transition: "display 0.3s ease",
  "&.MuiIconButton-hovered &": {
    display: "inline",
  },
  color: "black",
};

const NavItem = ({ to, icon, label }) => (
  <IconButton sx={iconButtonStyle} component={RouterLink} to={to}>
    <Box sx={linkStyle}>
      {icon}
      <Typography variant="body2" sx={labelStyle}>
        {label}
      </Typography>
    </Box>
  </IconButton>
);

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1.5rem",
        }}
      >
        <RouterLink
          to="/"
          style={{ textDecoration: "none", color: "whitesmoke" }}
        >
          <StickyNote2Icon style={{ fontSize: "1.5rem" }} />
        </RouterLink>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <NavItem to="/boards" icon={<DashboardOutlinedIcon />} label="Boards" />
          <NavItem to="/tables" icon={<TableChartOutlinedIcon />} label="Tables" />
        </Box>
      </Container>
    </AppBar>
  </Box>
);

export default Navbar;
