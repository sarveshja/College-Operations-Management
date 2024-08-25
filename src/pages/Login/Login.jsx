import React, { useState, useEffect } from 'react';
import { FaIdBadge, FaLock, FaSpinner } from 'react-icons/fa';
import styles from './Login.module.css';
import { getDocs, query, where, collection } from 'firebase/firestore';
import db from '../../services/firebaseConfig';

const Login = ({ onLoginSuccess, onSwitchToSignUp }) => {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueIdError, setUniqueIdError] = useState(''); // State for Unique ID error
  const [passwordError, setPasswordError] = useState(''); // State for Password error

  useEffect(() => {
    // Clear errors when the fields are corrected
    if (uniqueId.trim() !== '') {
      setUniqueIdError('');
    }
    if (password.trim() !== '') {
      setPasswordError('');
    }
  }, [uniqueId, password]);

  const handleLogin = async () => {
    if (!uniqueId.trim()) {
      setUniqueIdError('Unique ID is required.');
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
    }

    if (uniqueId.trim() && password.trim()) {
      setIsLoading(true); // Start loading

      try {
        const upperCaseUniqueId = uniqueId.toUpperCase();
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('uniqueId', '==', upperCaseUniqueId));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
          alert('Invalid Unique ID or Password');
          setIsLoading(false);
          return;
        }

        let isAuthenticated = false;
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.password === password) {
            isAuthenticated = true;
          }
        });

        if (isAuthenticated) {
          localStorage.setItem('uniqueID', upperCaseUniqueId);
          onLoginSuccess();
        } else {
          alert('Invalid Unique ID or Password');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again.');
      }

      setIsLoading(false); // Stop loading after operation is done
    }
  };

  return (
    <div className={styles.loginOverlay}>
      <div className={styles.loginContainer}>
        <h2 className={styles.login_heading}>Login</h2>

        <div className={`${styles.inputContainer} ${uniqueIdError ? styles.errorInput : ''}`}>
          <FaIdBadge className={styles.icon} />
          <input
            type="text"
            placeholder="Unique ID"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className={styles.inputField}
          />
        </div>
        {uniqueIdError && <p className={styles.errorText}>{uniqueIdError}</p>}

        <div className={`${styles.inputContainer} ${passwordError ? styles.errorInput : ''}`}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
        </div>
        {passwordError && <p className={styles.errorText}>{passwordError}</p>}

        <div className={styles.forgotPasswordContainer}>
          <a href="#forgot-password" className={styles.forgotPasswordLink}>
            Forgot Password?
          </a>
        </div>

        <button onClick={handleLogin} className={styles.loginButton}>
          {isLoading ? <FaSpinner className={styles.spinner} /> : 'Login'}
        </button>

        <div className={styles.createAccountContainer}>
          <span>Don't have an account? </span>
          <a className={styles.createAccountLink} onClick={onSwitchToSignUp}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
