import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaChalkboard, FaTable } from "react-icons/fa";
import '../styles/Navbar.css';
import { useAuth } from '../context/AuthContext';
import DarkMode from "../components/DarkMode/DarkMode";

const Navbar = () => {
    const { logout, isAuthenticated } = useAuth();

    return (
        <div className="navbar">
            <Link to="/" className="nav-brand">Sticky-Memo</Link>
            <div className="navbar-center-btns">
                <Link to="/Boards" className="nav-items">
                    <FaChalkboard /><span className="nav-hide">&nbsp;Boards</span>
                </Link>
                <Link to="/Tables" className="nav-items">
                    <FaTable /><span className="nav-hide">&nbsp;Tables</span>
                </Link>
            </div>
            <div className="nav-profile">
                <FaUserAlt className="profile-logo" />
                <div className="dropdown">
                    {isAuthenticated ? (
                        <Link to="/login" className="dropdown-items" onClick={logout}>
                            <span>Logout</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="dropdown-items">
                            <span>Login</span>
                        </Link>
                    )}
                    {isAuthenticated ? (
                        <Link to="/editUser" className="dropdown-items">
                            <span>Edit Profile</span>
                        </Link>
                    ) : (
                        <Link to="/register" className="dropdown-items">
                            <span>Register </span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
