import React from 'react';
import styles from './FacultyModal.module.css';

const FacultyModal = ({ faculty, onClose, onSave, mode }) => {
    // Initialize state based on mode
    const [editedFaculty, setEditedFaculty] = React.useState(
        mode === 'edit' ? { ...faculty } : { id: Date.now(), name: '' }
    );

    const handleChange = (e) => {
        setEditedFaculty({ ...editedFaculty, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(editedFaculty);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalCard}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        {mode === 'edit' ? 'Edit Faculty' : 'Add Faculty'}
                    </h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width="20" height="20">
                            <path fill="#000" d="M242.72 256L340.61 157.41a16 16 0 000-22.62l-22.62-22.62a16 16 0 00-22.62 0L192 210.28 93.41 111.77a16 16 0 00-22.62 0l-22.62 22.62a16 16 0 000 22.62L141.28 256 48.17 349.11a16 16 0 000 22.62l22.62 22.62a16 16 0 0022.62 0L192 301.72l98.59 98.59a16 16 0 0022.62 0l22.62-22.62a16 16 0 000-22.62z"/>
                        </svg>
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>Faculty Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editedFaculty.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleSave}>
                        {mode === 'edit' ? 'Save Changes' : 'Add Faculty'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FacultyModal;
