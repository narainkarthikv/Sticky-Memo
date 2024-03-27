import React from "react";
import { FaUserAlt, FaChalkboard, FaTable } from "react-icons/fa";
import '../css/Navbar.component.css';

const Navbar = () => {
    return(
        <div className="navbar">
            <a href="/" className="nav-board">Sticky-Memo</a>
            <a href="/Boards" className="nav-items"><FaChalkboard/><span className="nav-hide">&nbsp;Boards</span></a>
            {/* <a href="/Calendar" className="nav-items"><FaCalendarAlt/><span className="nav-hide">&nbsp;Calendar</span></a> */}
            <a href="/Tables" className="nav-items"><FaTable/><span className="nav-hide">&nbsp;Tables</span></a>
            <div className="nav-profile">
                <FaUserAlt/>
                <div className="dropdown">
                    <a href="/editUser" className="dropdown-items"><span>Edit Profile</span></a>
                    <a href="/logout" className="dropdown-items"><span>Logout</span></a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;