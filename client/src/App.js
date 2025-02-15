import React from 'react';
import DashBoard from './pages/DashBoard';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const App = () => {
  return (
    <Router>
      <NavBar /> {/* Navbar will appear on all pages */}
      <Routes>
        <Route path="/" element={<DashBoard />} /> {/* Dashboard as homepage */}
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn/>} />
      </Routes>
    </Router>
  );
};

export default App;
