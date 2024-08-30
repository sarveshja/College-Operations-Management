import React, { useState } from 'react';
import styles from './HorizontalNavbar.module.css';
import logo from '../../../public/images/logo.png';
import { 
  FaCalendarCheck, FaChartLine, FaClock, FaSignOutAlt, 
  FaChalkboardTeacher, FaUserTie, FaBuilding, FaBookOpen 
} from 'react-icons/fa'; // Import additional icons
import logout from '../../services/logout';

const HorizontalNavbar = ({ onNavbarClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = (buttonName) => {
    onNavbarClick(buttonName);
    setIsMenuOpen(false); // Close menu after click
  };

  const handleLogout = () => {
    // Call the onLogout function passed from the parent component
    logout();
    onLogout();
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.navbarTextLogo}>Sri Ramachandra Faculty of Engineering and Technology</span>
      </div>
      <div className={styles.menuIcon} onClick={handleMenuClick}>
        &#9776; {/* Menu Icon */}
      </div>
      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.menuItem} onClick={() => handleButtonClick('Attendance')}>
            <FaCalendarCheck className={styles.icon} /> Attendance
          </div>
          <div className={styles.menuItem} onClick={() => handleButtonClick('Results')}>
            <FaChartLine className={styles.icon} /> Results
          </div>
          <div className={styles.menuItem} onClick={() => handleButtonClick('Time Table')}>
            <FaClock className={styles.icon} /> Time Table
          </div>
          <div className={styles.menuItem} onClick={() => handleButtonClick('Classroom')}>
            <FaChalkboardTeacher className={styles.icon} /> Classroom
          </div>
          <div className={styles.menuItem} onClick={() => handleButtonClick('Faculty')}>
            <FaUserTie className={styles.icon} /> Faculty
          </div>
          <div className={styles.menuItem} onClick={() => handleButtonClick('Department')}>
            <FaBuilding className={styles.icon} /> Department
          </div>
          <div className={styles.menuItem} onClick={() => handleButtonClick('Courses')}>
            <FaBookOpen className={styles.icon} /> Courses
          </div>
          <div className={styles.menuItem} onClick={handleLogout}>
            <FaSignOutAlt className={styles.icon} /> Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizontalNavbar;
