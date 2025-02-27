import React from 'react';
import DashBoard from './pages/DashBoard';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />} /> 
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </Router>
  );
};

export default App;
