import React, { useState } from 'react';
import styles from './HorizontalNavbar.module.css';
import logo from '../../../public/images/logo.png';
import { FaCalendarCheck, FaChartLine, FaClock } from 'react-icons/fa'; // Import icons

const HorizontalNavbar = ({ onNavbarClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = (buttonName) => {
    onNavbarClick(buttonName);
    setIsMenuOpen(false); // Close menu after click
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
        </div>
      )}
    </div>
  );
};

export default HorizontalNavbar;
