import React from "react";
import { Link } from 'react-router-dom';
import { FaUserAlt, FaChalkboard, FaTable } from "react-icons/fa";
import '../styles/Navbar.css';

const Navbar = () => (
    <nav className="navbar">
        
        <Link to="/" className="nav-brand">Sticky Memo</Link>
        
        <div className="navbar-center-btns">
            <NavItem to="/Boards" icon={<FaChalkboard />} label="Boards" />
            <NavItem to="/Tables" icon={<FaTable />} label="Tables" />
        </div>
        
        <ProfileDropdown />
    </nav>
);

const NavItem = ({ to, icon, label }) => (
    <Link to={to} className="nav-items">
        {icon}<span className="nav-hide">&nbsp;{label}</span>
    </Link>
);

const ProfileDropdown = () => (
    <div className="nav-profile">
        <FaUserAlt className="profile-logo" />
        <div className="dropdown">
            <Link to="/editUser" className="dropdown-items edit"><span>Edit Profile</span></Link>
            <a href="/logout" className="dropdown-items logout"><span>Logout</span></a>
        </div>
    </div>
);

export default Navbar;
