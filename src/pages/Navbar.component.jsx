import React from "react";
import { Link } from 'react-router-dom';
import { FaUserAlt, FaHome, FaChalkboard, FaTable } from "react-icons/fa";
import '../styles/Navbar.component.css';
import DarkMode from '../components/DarkMode/DarkMode'


const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="nav-brand">Sticky-Memo</Link>
            <div className="navbar-center-btns">
                <Link to="/" className="nav-items">
                    <FaHome /><span className="nav-hide">&nbsp;Home</span>
                </Link>
                <Link to="/Boards" className="nav-items">
                    <FaChalkboard /><span className="nav-hide">&nbsp;Boards</span>
                </Link>
                <Link to="/Tables" className="nav-items">
                    <FaTable /><span className="nav-hide">&nbsp;Tables</span>
                </Link>
            </div>
            <div className="btn-pro">
            <DarkMode/>
            <div className="nav-profile">
                <FaUserAlt className="profile-logo" />
                <div className="dropdown">
                    <Link to="/editUser" className="dropdown-items"><span>Edit Profile</span></Link>
                    <a href="/logout" className="dropdown-items"><span>Logout</span></a>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Navbar;
