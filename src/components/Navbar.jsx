import React, { useState } from "react";
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import PersonIcon from '@mui/icons-material/Person';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';


const NavItem = ({ to, icon, label }) => (
    <IconButton
        sx={{
            width: '3rem',
            height: '3rem',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            color: 'black',
            '&:hover': {
                width: '6rem',
                borderRadius: '20px',
                backgroundColor: 'white',
            },
        }}
    >
        {/* The link element is used to create styled links. */}
        <Link
            href={to}
            underline="none"
            color="inherit"
            sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <Box>{icon}</Box>
            {/* The typography element allows to render texts */}
            <Typography
                variant="body2"
                sx={{
                    ml: 0.5,
                    display: 'none',
                    transition: 'display 0.3s ease',
                    '.MuiIconButton-root:hover &': {
                        display: 'inline',
                    },
                    color: 'black'
                }}
            >
                {label}
            </Typography>
        </Link>
    </IconButton>
);

const ProfileDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        /* Dropdown for user actions: Edit Profile and Logout */
        <Box>
            <IconButton onClick={handleClick}>
                <PersonIcon sx={{ color: 'white' }} />
            </IconButton>

            {/* Element from MUI to render a list of options */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Link href="/editUser" underline="none" color="black" sx={{ fontSize: '14px', '&:hover': { color: 'blue' } }}>Edit Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link href="/logout" underline="none" color="black" sx={{ fontSize: '14px', '&:hover': { color: 'red' } }}>Logout</Link>
                </MenuItem>
            </Menu>

        </Box>
    )
};

const Navbar = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Container maxWidth="none" sx={{ display: 'flex', justifyContent: 'space-between', padding: ' 0.5rem 1.5rem', alignItems: 'center', margin: 0 }}>
                {/* Brand name that links to the homepage */}
                <Link
                    href="/"
                    color="whitesmoke"
                    underline="none"
                    sx={{
                        fontSize: '1.5rem',
                        '&:hover': { cursor: 'pointer' },
                        mr: 1
                    }} >
                    Sticky Memo
                </Link>

                {/* Center section of the navbar containing navigation items */}
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <NavItem to="/Boards" icon={<DashboardOutlinedIcon />} label="Boards" />
                    <NavItem to="/Tables" icon={<TableChartOutlinedIcon />} label="Tables" />
                </Box>

                {/* Profile section with dropdown menu */}
                <ProfileDropdown />
            </Container>
        </AppBar>
    </Box>
);

export default Navbar;
