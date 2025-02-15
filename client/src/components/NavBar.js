import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-list">
          <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
          <li className="navbar-item"><Link to="/about" className="navbar-link">About</Link></li>
          <li className="navbar-item"><Link to="/contact" className="navbar-link">Contact</Link></li>
        </ul>
        <ul className="profile-list">
          <li className="navbar-item"><Link to="/signIn" className="navbar-link">Sign In</Link></li>
          <li className="navbar-item"><Link to="/signUp" className="navbar-link">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
