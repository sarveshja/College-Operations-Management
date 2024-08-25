import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaLockOpen, FaSpinner, FaIdBadge } from 'react-icons/fa';
import styles from './SignUp.module.css';
import db from '../../services/firebaseConfig'; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; 

const SignUp = ({ onSignUpSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to track errors

  useEffect(() => {
    // Clear errors when the fields are corrected
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: name.trim() ? '' : prevErrors.name,
      uniqueId: uniqueId.trim() ? '' : prevErrors.uniqueId,
      email: email.trim() ? '' : prevErrors.email,
      password: password.trim() ? '' : prevErrors.password,
      confirmPassword: confirmPassword.trim() ? '' : prevErrors.confirmPassword,
    }));
  }, [name, uniqueId, email, password, confirmPassword]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!uniqueId.trim()) newErrors.uniqueId = 'Unique ID is required';
    if (uniqueId.length > 8) newErrors.uniqueId = 'Unique ID must be 8 characters or less';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!email.endsWith('@sret.edu.in')) newErrors.email = 'Email must be in the format @sret.edu.in';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password) || password.length < 8) {
      newErrors.password = 'Password must be 8 characters long and include at least one letter and one number';
    }
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Convert uniqueId to uppercase and email to lowercase
      const upperCaseUniqueId = uniqueId.toUpperCase();
      const lowerCaseEmail = email.toLowerCase();

      // Add user data to Firestore
      await addDoc(collection(db, "users"), {
        name,
        uniqueId: upperCaseUniqueId,
        email: lowerCaseEmail,
        password, // In a real-world app, never store plain passwords
      });

      alert('Account created successfully');
      onSignUpSuccess(); // After successful sign-up, switch to the main app or login
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error creating account. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.signUpOverlay}>
      <div className={styles.signUpContainer}>
        <h2 className={styles.signUp_heading}>Sign Up</h2>

        <div className={`${styles.inputContainer} ${errors.name ? styles.errorInput : ''}`}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputField}
          />
        </div>
        {errors.name && <p className={styles.errorText}>{errors.name}</p>}

        <div className={`${styles.inputContainer} ${errors.uniqueId ? styles.errorInput : ''}`}>
          <FaIdBadge className={styles.icon} />
          <input
            type="text"
            placeholder="Unique ID"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className={styles.inputField}
            maxLength={8} // Restrict input to a maximum of 8 characters
          />
        </div>
        {errors.uniqueId && <p className={styles.errorText}>{errors.uniqueId}</p>}

        <div className={`${styles.inputContainer} ${errors.email ? styles.errorInput : ''}`}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
        </div>
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        <div className={`${styles.inputContainer} ${errors.password ? styles.errorInput : ''}`}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
        </div>
        {errors.password && <p className={styles.errorText}>{errors.password}</p>}

        <div className={`${styles.inputContainer} ${errors.confirmPassword ? styles.errorInput : ''}`}>
          <FaLockOpen className={styles.icon} />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.inputField}
          />
        </div>
        {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}

        <button onClick={handleSignUp} className={styles.signUpButton}>
          {isLoading ? <FaSpinner className={styles.spinner} /> : 'Sign Up'}
        </button>

        <div className={styles.switchContainer}>
          <span>Already have an account? </span>
          <a className={styles.switchLink} onClick={onSwitchToLogin}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
