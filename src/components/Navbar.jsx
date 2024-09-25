import React from "react";
import { Link } from 'react-router-dom';
import { FaUserAlt, FaChalkboard, FaTable } from "react-icons/fa";
import '../styles/Navbar.css';

const NavItem = ({ to, icon, label }) => (
    <Link to={to} className="nav-items">
        {/* Icon followed by a label */}
        {icon}<span className="nav-hide">&nbsp;{label}</span>
    </Link>
);

const ProfileDropdown = () => (
    <div className="nav-profile">
        <FaUserAlt className="profile-logo" />
        
        {/* Dropdown for user actions: Edit Profile and Logout */}
        <div className="dropdown">
            <Link to="/editUser" className="dropdown-items edit"><span>Edit Profile</span></Link>
            <a href="/logout" className="dropdown-items logout"><span>Logout</span></a>
        </div>
    </div>
);

const Navbar = () => (
    <nav className="navbar">
        {/* Brand name that links to the homepage */}
        <Link to="/" className="nav-brand">Sticky Memo</Link>
        
        {/* Center section of the navbar containing navigation items */}
        <div className="navbar-center-btns">
            <NavItem to="/Boards" icon={<FaChalkboard />} label="Boards" />
            <NavItem to="/Tables" icon={<FaTable />} label="Tables" />
        </div>
        
        {/* Profile section with dropdown menu */}
        <ProfileDropdown />
    </nav>
);

export default Navbar;
