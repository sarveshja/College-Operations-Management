import React, { useState, Fragment } from 'react';
import ClassroomModal from '../Modal/ClassroomModal';
import styles from './Classroom.module.css';
import { classroomsData } from './classroomsData';

const Classroom = () => {
    const [classrooms, setClassrooms] = useState(classroomsData);
    const [selectedClassroom, setSelectedClassroom] = useState(null);
    const [mode, setMode] = useState('');

    const handleEdit = (id) => {
        setSelectedClassroom(classrooms.find((classroom) => classroom.id === id));
        setMode('edit');
    };

    const handleDelete = (id) => {
        setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
    };

    const handleSave = (editedClassroom) => {
        if (editedClassroom.id) {
            // Editing an existing classroom
            setClassrooms(classrooms.map((classroom) =>
                classroom.id === editedClassroom.id ? editedClassroom : classroom
            ));
        } else {
            // Adding a new classroom
            setClassrooms([...classrooms, editedClassroom]);
        }
        handleClose();
    };

    const handleAddClassroom = () => {
        setSelectedClassroom({
            id: Date.now(), // Ensure a unique id for new classroom
            name: '',
        });
        setMode('add'); // Use 'add' mode for clarity
    };

    const handleClose = () => {
        setSelectedClassroom(null);
        setMode('');
    };

    return (
        <Fragment>
            <div className={styles.header}>
                <h2 className={styles.heading}>Classroom Details</h2>
                <button className={styles.addButton} onClick={handleAddClassroom}>
                    Add Classroom
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableHeader}>Classroom Name</th>
                            <th className={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {classrooms.map((classroom) => (
                            <tr key={classroom.id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{classroom.name}</td>
                                <td className={styles.tableCell}>
                                    <button className={styles.editButton} onClick={() => handleEdit(classroom.id)}>
                                        Edit
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(classroom.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedClassroom && (
                    <ClassroomModal
                        key={selectedClassroom.id} // Add a key to manage state
                        classroom={selectedClassroom}
                        onClose={handleClose}
                        onSave={handleSave}
                        mode={mode}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Classroom;
