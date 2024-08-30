import React from 'react';
import styles from './VerticalNavbar.module.css';
import { 
  FaCalendarCheck, FaChartLine, FaClock, FaSignOutAlt, 
  FaChalkboardTeacher, FaUserTie, FaBuilding, FaBookOpen 
} from 'react-icons/fa'; // Importing additional icons
import logo from '../../../public/images/logo.png';
import logout from '../../services/logout';

const VerticalNavbar = ({ onNavbarClick, onLogout }) => {

  const handleClick = (buttonName) => {
    onNavbarClick(buttonName);
  };

  const handleLogout = () => {
    logout();
    onLogout();
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
          <li className={styles.navbarItem} onClick={() => handleClick('Classroom')}>
            <FaChalkboardTeacher className={styles.icon} />
            <span className={styles.navbarText}>Classroom</span>
          </li>
          <li className={styles.navbarItem} onClick={() => handleClick('Faculty')}>
            <FaUserTie className={styles.icon} />
            <span className={styles.navbarText}>Faculty</span>
          </li>
          <li className={styles.navbarItem} onClick={() => handleClick('Department')}>
            <FaBuilding className={styles.icon} />
            <span className={styles.navbarText}>Department</span>
          </li>
          <li className={styles.navbarItem} onClick={() => handleClick('Courses')}>
            <FaBookOpen className={styles.icon} />
            <span className={styles.navbarText}>Courses</span>
          </li>
          <li className={styles.navbarItem} onClick={handleLogout}>
            <FaSignOutAlt className={styles.icon} />
            <span className={styles.navbarText}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalNavbar;
