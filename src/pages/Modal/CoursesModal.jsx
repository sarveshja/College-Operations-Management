import React, { useState, useEffect } from 'react';
import styles from './CoursesModal.module.css';

const CoursesModal = ({ course, onClose, onSave, mode, existingCourses }) => {
    const [editedCourse, setEditedCourse] = useState(
        mode === 'edit' ? { ...course } : { id: Date.now(), code: '', name: '' }
    );
    const [warning, setWarning] = useState(''); // State for warning message

    useEffect(() => {
        setEditedCourse(mode === 'edit' ? { ...course } : { id: Date.now(), code: '', name: '' });
        setWarning('');
    }, [course, mode]);

    const handleChange = (e) => {
        setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value });
        setWarning(''); // Clear warning when user is typing
    };

    const handleSaveClick = () => {
        if (!editedCourse.code.trim() || !editedCourse.name.trim()) {
            setWarning('Both course code and course name are required.');
            return;
        }

        // Check for duplicate course code or name (case-insensitive)
        const duplicate = existingCourses.some(
            (c) =>
                (c.code.toLowerCase() === editedCourse.code.toLowerCase() ||
                    c.name.toLowerCase() === editedCourse.name.toLowerCase()) &&
                (mode === 'edit' ? c.id !== course.id : true)
        );

        if (duplicate) {
            setWarning('A course with this code or name already exists.');
            return;
        }

        onSave(editedCourse);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalCard}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        {mode === 'edit' ? 'Edit Course' : 'Add Course'}
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
                        <label>Course Code:</label>
                        <input
                            type="text"
                            name="code"
                            value={editedCourse.code}
                            onChange={handleChange}
                            placeholder="Enter course code"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Course Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editedCourse.name}
                            onChange={handleChange}
                            placeholder="Enter course name"
                        />
                    </div>
                    {warning && <p className={styles.warning}>{warning}</p>}
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleSaveClick} className={styles.saveButton}>
                        {mode === 'edit' ? 'Save Changes' : 'Add Course'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoursesModal;
