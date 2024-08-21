import React from 'react';
import styles from './VerticalNavbar.module.css';
import { FaCalendarCheck, FaChartLine, FaClock } from 'react-icons/fa'; // Importing icons from react-icons
import logo from '../../../public/images/logo.png';

const VerticalNavbar = ({ onNavbarClick }) => {
  
  const handleClick = (buttonName) => {
    onNavbarClick(buttonName);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Logo" />
        <span className={styles.navbarTextLogo}>Sri Ramachandra Faculty of Engineering and Technology</span>
      </div>
      <div className={styles.navbarIconsContainer}>
        <ul className={styles.navbarIcons}>
          <li className={styles.navbarItem} onClick={() => handleClick('Attendance')}>
            <FaCalendarCheck className={styles.icon} />
            <span className={styles.navbarText}>Attendance</span>
          </li>
          <li className={styles.navbarItem} onClick={() => handleClick('Results')}>
            <FaChartLine className={styles.icon} />
            <span className={styles.navbarText}>Results</span>
          </li>
          <li className={styles.navbarItem} onClick={() => handleClick('Time Table')}>
            <FaClock className={styles.icon} />
            <span className={styles.navbarText}>Time Table</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VerticalNavbar;
