import React from 'react';
import DashBoard from './pages/DashBoard';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import WorkoutMap from './pages/WorkoutMapPage';
import SubscriptionPage from './pages/Subscription';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />} /> 
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/workoutMap' element={<WorkoutMap/>} />
        <Route path='/subscribe' element={<SubscriptionPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
