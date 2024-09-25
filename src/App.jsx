import React, { useState, useEffect } from 'react';
import './App.css';
import VerticalNavbar from './components/VerticalNavBar/VerticalNavbar';
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar';
import TimeTable from './pages/Time Table/TimeTable';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp'; // Import the SignUp component
import Classroom from './pages/Classroom/Classroom'; // Import the Classroom component
import Faculty from './pages/Faculty/Faculty';
import Department from './pages/Department/Department';
import Course from './pages/Courses/Courses';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const [isSignUp, setIsSignUp] = useState(false); // Manage sign-up state
  const [selectedOperation, setSelectedOperation] =useState('Time Table by Degree');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if 'uniqueID' is in localStorage and set login state accordingly
    const uniqueId = localStorage.getItem('uniqueID');
    if (uniqueId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn((prevState) => {
      return !isLoggedIn;
    });
  };

  const handleNavbarClick = (opr) => {
    setSelectedOperation(opr);
    console.log(`Button clicked: ${opr}`);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleSwitchToSignUp = () => {
    setIsSignUp(true); // Switch to the SignUp component
  };

  const handleSwitchToLogin = () => {
    setIsSignUp(false); // Switch back to the Login component
  };

  // Render the Login or SignUp component if the user is not logged in
  if (!isLoggedIn) {
    if (isSignUp) {
      return <SignUp onSignUpSuccess={handleSwitchToLogin} onSwitchToLogin={handleSwitchToLogin} />;
    } else {
      return <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignUp={handleSwitchToSignUp} />;
    }
  }

  return (
    <div>
      {isMobileView ? (
        <HorizontalNavbar onNavbarClick={handleNavbarClick} onLogout={handleLogout} />
      ) : (
        <VerticalNavbar onNavbarClick={handleNavbarClick} onLogout={handleLogout} />
      )}
      <div className="content-container">
        {selectedOperation === 'Time Table by Degree' && <TimeTable type="Time Table by Degree" />}
        {selectedOperation === 'Time Table by Faculty' && <TimeTable type="Time Table by Faculty" />}
        {selectedOperation === 'Time Table by Classroom' && <TimeTable type="Time Table by Classroom" />}
        {selectedOperation === 'Time Table by Day' && <TimeTable type="Time Table by Day" />}
        
        {selectedOperation === 'Classroom' && <Classroom />} 
        {selectedOperation === 'Faculty' && <Faculty />} 
        {selectedOperation === 'Department' && <Department />} 
        {selectedOperation === 'Courses' && <Course />} 


        {/* Render Classroom component */}
      </div>
    </div>
  );
};

export default App;
