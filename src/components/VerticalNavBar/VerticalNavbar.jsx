import React, { useState } from 'react';
import styles from './VerticalNavbar.module.css';
import { 
  FaCalendarCheck, FaChartLine, FaClock, FaSignOutAlt, 
  FaChalkboardTeacher, FaUserTie, FaBuilding, FaBookOpen, FaChevronDown, FaChevronUp 
} from 'react-icons/fa';
import logo from '../../../public/images/logo.png';
import logout from '../../services/logout';

const VerticalNavbar = ({ onNavbarClick, onLogout }) => {
  const [showTimeTableDropdown, setShowTimeTableDropdown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (buttonName) => {
    onNavbarClick(buttonName);
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const toggleTimeTableDropdown = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    setShowTimeTableDropdown(!showTimeTableDropdown);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowTimeTableDropdown(false); // Ensure dropdown closes on hover initially
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowTimeTableDropdown(false); // Ensure dropdown closes when leaving hover
  };

  return (
    <div 
      className={styles.navbar} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
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
          <li className={styles.navbarItem} onClick={toggleTimeTableDropdown}>
            <div className={styles.navbarItemWithDropdown}>
              <FaClock className={styles.icon} />
              <span className={styles.navbarText}>Time Table</span>
              {isHovering && (
                <FaChevronDown
                  className={styles.dropdownIcon}
                  onClick={toggleTimeTableDropdown}
                />
              )}
            </div>
          </li>
          {showTimeTableDropdown && (
            <ul className={styles.dropdownMenu}>
              <li className={styles.dropdownItem} onClick={() => handleClick('By Degree')}>
                <FaBookOpen className={styles.icon} />
                <span className={styles.dropdownText}>By Degree</span>
              </li>
              <li className={styles.dropdownItem} onClick={() => handleClick('By Faculty')}>
                <FaUserTie className={styles.icon} />
                <span className={styles.dropdownText}>By Faculty</span>
              </li>
              <li className={styles.dropdownItem} onClick={() => handleClick('By Classroom')}>
                <FaChalkboardTeacher className={styles.icon} />
                <span className={styles.dropdownText}>By Classroom</span>
              </li>
              <li className={styles.dropdownItem} onClick={() => handleClick('By Day')}>
                <FaCalendarCheck className={styles.icon} />
                <span className={styles.dropdownText}>By Day</span>
              </li>
            </ul>
          )}
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
