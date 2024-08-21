import React, { useState, useEffect } from 'react';
import './App.css';
import VerticalNavbar from './components/VerticalNavBar/VerticalNavBar'; // Adjust the path as needed
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar'; // Adjust the path as needed
import TimeTable from './pages/Time Table/TimeTable';

const App = () => {
  const [selectedOperation, setSelectedOperation] = useState('Time Table');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavbarClick = (opr) => {
    setSelectedOperation(opr);
    console.log(`Button clicked: ${opr}`);
  };

  return (
    <div>
      {isMobileView ? (
        <HorizontalNavbar onNavbarClick={handleNavbarClick} />
      ) : (
        <VerticalNavbar onNavbarClick={handleNavbarClick} />
      )}
      <div className='content-container'>
        {selectedOperation === 'Time Table' && <TimeTable />}
      </div>
    </div>
  );
};

export default App;
