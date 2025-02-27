import {React} from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import LogoutButton from './LogOutButton';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const token = useSelector((state) => state.auth.token); 
  const isAuthenticated = !!token;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-list">
          <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
          <li className="navbar-item"><Link to="/about" className="navbar-link">About</Link></li>
          <li className="navbar-item"><Link to="/contact" className="navbar-link">Contact</Link></li>
        </ul>
        <ul className="profile-list">
          {isAuthenticated ? (
            <>
            <li className="navbar-item">
              <LogoutButton />
            </li>
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">Profile</Link>
            </li>
            </>
          ) : (
            <>
              <li className="navbar-item"><Link to="/signIn" className="navbar-link">Sign In</Link></li>
              <li className="navbar-item"><Link to="/signUp" className="navbar-link">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
