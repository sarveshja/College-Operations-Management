import React from 'react';
import styles from './DepartmentModal.module.css';

const DepartmentModal = ({ department, onClose, onSave, mode }) => {
    // Initialize state based on mode
    const [editedDepartment, setEditedDepartment] = React.useState(
        mode === 'edit' ? { ...department } : { id: Date.now(), name: '' }
    );

    const handleChange = (e) => {
        setEditedDepartment({ ...editedDepartment, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
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
                            <path fill="#000" d="M242.72 256L340.61 157.41a16 16 0 000-22.62l-22.62-22.62a16 16 0 00-22.62 0L192 210.28 93.41 111.77a16 16 0 00-22.62 0l-22.62 22.62a16 16 0 000 22.62L141.28 256 48.17 349.11a16 16 0 000 22.62l22.62 22.62a16 16 0 0022.62 0L192 301.72l98.59 98.59a16 16 0 0022.62 0l22.62-22.62a16 16 0 000-22.62z"/>
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
                        />
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleSave}>
                        {mode === 'edit' ? 'Save Changes' : 'Add Department'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentModal;
