import React, { useState, useEffect } from 'react';
import styles from './ClassroomModal.module.css';

const ClassroomModal = ({ classroom, onClose, onSave, mode, existingClassrooms }) => {
    const [editedClassroom, setEditedClassroom] = useState(
        mode === 'edit' ? { ...classroom } : { id: Date.now(), name: '' }
    );
    const [warning, setWarning] = useState(''); // State for warning message

    useEffect(() => {
        setEditedClassroom(mode === 'edit' ? { ...classroom } : { id: Date.now(), name: '' });
    }, [classroom, mode]);

    const handleChange = (e) => {
        setEditedClassroom({ ...editedClassroom, [e.target.name]: e.target.value });
        setWarning(''); // Clear warning when user is typing
    };

    const handleSave = () => {
        if (!editedClassroom.name.trim()) {
            setWarning('Classroom name is required.');
            return;
        }

        // Check for duplicate classroom name
        const duplicate = existingClassrooms.some(
            (classroom) => classroom.name.toLowerCase() === editedClassroom.name.toLowerCase()
        );

        if (duplicate && mode === 'add') {
            setWarning('A classroom with this name already exists.');
            return;
        }

        onSave(editedClassroom);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalCard}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        {mode === 'edit' ? 'Edit Classroom' : 'Add Classroom'}
                    </h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width="20" height="20">
                            <path fill="#000" d="M242.72 256L340.61 157.41a16 16 0 000-22.62l-22.62-22.62a16 16 0 00-22.62 0L192 210.28 93.41 111.77a16 16 0 00-22.62 0l-22.62 22.62a16 16 0 000 22.62L141.28 256 48.17 349.11a16 16 0 000 22.62l22.62 22.62a16 16 0 0022.62 0L192 301.72l98.59 98.59a16 16 0 0022.62 0l22.62-22.62a16 16 0 000-22.62z"/>
                        </svg>
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>Classroom Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editedClassroom.name}
                            onChange={handleChange}
                        />
                        {warning && <p className={styles.warning}>{warning}</p>}
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleSave}>
                        {mode === 'edit' ? 'Save Changes' : 'Add Classroom'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassroomModal;
