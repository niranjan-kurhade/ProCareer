import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">ProCareer</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/resume-builder">Resume Builder</Link></li>
                <li><Link to="/resume-score">Resume Score</Link></li>
                <li><Link to="/prepare">Prepare</Link></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
