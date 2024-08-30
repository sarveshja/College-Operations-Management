import React, { useState, Fragment } from 'react';
import FacultyModal from '../Modal/FacultyModal';
import styles from './Faculty.module.css';
import { facultyData } from './facultyData'; // You would need a data file similar to `classroomsData.js`

const Faculty = () => {
    const [facultyList, setFacultyList] = useState(facultyData);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [mode, setMode] = useState('');

    const handleEdit = (id) => {
        setSelectedFaculty(facultyList.find((faculty) => faculty.id === id));
        setMode('edit');
    };

    const handleDelete = (id) => {
        setFacultyList(facultyList.filter((faculty) => faculty.id !== id));
    };

    const handleSave = (editedFaculty) => {
        if (editedFaculty.id) {
            // Editing an existing faculty member
            setFacultyList(facultyList.map((faculty) =>
                faculty.id === editedFaculty.id ? editedFaculty : faculty
            ));
        } else {
            // Adding a new faculty member
            setFacultyList([...facultyList, editedFaculty]);
        }
        handleClose();
    };

    const handleAddFaculty = () => {
        setSelectedFaculty({
            id: Date.now(), // Unique ID for the new faculty member
            name: '',
        });
        setMode('add'); // Set mode to 'add'
    };

    const handleClose = () => {
        setSelectedFaculty(null);
        setMode('');
    };

    return (
        <Fragment>
            <div className={styles.header}>
                <h2 className={styles.heading}>Faculty Details</h2>
                <button className={styles.addButton} onClick={handleAddFaculty}>
                    Add Faculty
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableHeader}>Faculty Name</th>
                            <th className={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {facultyList.map((faculty) => (
                            <tr key={faculty.id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{faculty.name}</td>
                                <td className={styles.tableCell}>
                                    <button className={styles.editButton} onClick={() => handleEdit(faculty.id)}>
                                        Edit
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(faculty.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedFaculty && (
                    <FacultyModal
                        key={selectedFaculty.id} // Unique key for selected faculty modal
                        faculty={selectedFaculty}
                        onClose={handleClose}
                        onSave={handleSave}
                        mode={mode}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Faculty;
