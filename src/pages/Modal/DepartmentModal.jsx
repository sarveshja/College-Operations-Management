// src/components/Modal/DepartmentModal.jsx

import React, { useState, useEffect } from 'react';
import styles from './DepartmentModal.module.css';

const DepartmentModal = ({ department, onClose, onSave, mode, existingDepartments }) => {
    const [editedDepartment, setEditedDepartment] = useState(
        mode === 'edit' ? { ...department } : { name: '' }
    );
    const [warning, setWarning] = useState(''); // State for warning message

    useEffect(() => {
        setEditedDepartment(mode === 'edit' ? { ...department } : { name: '' });
        setWarning('');
    }, [department, mode]);

    const handleChange = (e) => {
        setEditedDepartment({ ...editedDepartment, [e.target.name]: e.target.value });
        setWarning(''); // Clear warning when user is typing
    };

    const handleSaveClick = () => {
        if (!editedDepartment.name.trim()) {
            setWarning('Department name is required.');
            return;
        }

        // Check for duplicate department name (case-insensitive)
        const duplicate = existingDepartments.some(
            (dept) =>
                dept.name.toLowerCase() === editedDepartment.name.toLowerCase() &&
                (mode === 'edit' ? dept.id !== department.id : true)
        );

        if (duplicate) {
            setWarning('A department with this name already exists.');
            return;
        }

        onSave(editedDepartment);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalCard}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        {mode === 'edit' ? 'Edit Department' : 'Add Department'}
                    </h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width="20" height="20">
                            <path
                                fill="#000"
                                d="M242.72 256L340.61 157.41a16 16 0 000-22.62l-22.62-22.62a16 16 0 00-22.62 0L192 210.28 93.41 111.77a16 16 0 00-22.62 0l-22.62 22.62a16 16 0 000 22.62L141.28 256 48.17 349.11a16 16 0 000 22.62l22.62 22.62a16 16 0 0022.62 0L192 301.72l98.59 98.59a16 16 0 0022.62 0l22.62-22.62a16 16 0 000-22.62z"
                            />
                        </svg>
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>Department Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editedDepartment.name}
                            onChange={handleChange}
                            placeholder="Enter department name"
                        />
                        {warning && <p className={styles.warning}>{warning}</p>}
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleSaveClick} className={styles.saveButton}>
                        {mode === 'edit' ? 'Save Changes' : 'Add Department'}
                    </button>
                    {/* <button onClick={onClose} className={styles.cancelButton}>
                        Cancel
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default DepartmentModal;
