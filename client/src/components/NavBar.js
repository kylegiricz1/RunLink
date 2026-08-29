import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaMapMarkedAlt, FaRunning } from 'react-icons/fa';
import LogoutButton from './LogOutButton';
import './NavBar.css';

const navLinkClass = ({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`;

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token);

  return (
    <header className="navbar">
      <nav className="navbar-container" aria-label="Main navigation">
        <NavLink to="/" className="navbar-brand" aria-label="RunLink home">
          <img src="/RunLink.jpeg" alt="" className="navbar-logo" />
          <span><strong>RunLink</strong><small>Find your running crew</small></span>
        </NavLink>
        <ul className="navbar-list">
          <li><NavLink to="/" end className={navLinkClass}>Discover</NavLink></li>
          <li><NavLink to="/workoutMap" className={navLinkClass}><FaMapMarkedAlt aria-hidden="true" /> Map</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
        </ul>
        <ul className="profile-list">
          {isAuthenticated ? <>
            <li><NavLink to="/subscribe" className={navLinkClass}>Membership</NavLink></li>
            <li><NavLink to="/profile" className="profile-link"><FaRunning aria-hidden="true" /> Profile</NavLink></li>
            <li><LogoutButton /></li>
          </> : <>
            <li><NavLink to="/signIn" className={navLinkClass}>Sign in</NavLink></li>
            <li><NavLink to="/signUp" className="signup-link">Join RunLink</NavLink></li>
          </>}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
