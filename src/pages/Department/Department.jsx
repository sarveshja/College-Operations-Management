import React, { useState, Fragment } from 'react';
import DepartmentModal from '../Modal/DepartmentModal';
import styles from './Department.module.css';
import { departmentData } from './departmentData'; // Import your department data

const Department = () => {
    const [departments, setDepartments] = useState(departmentData);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [mode, setMode] = useState('');

    const handleEdit = (id) => {
        setSelectedDepartment(departments.find((department) => department.id === id));
        setMode('edit');
    };

    const handleDelete = (id) => {
        setDepartments(departments.filter((department) => department.id !== id));
    };

    const handleSave = (editedDepartment) => {
        if (editedDepartment.id) {
            // Editing an existing department
            setDepartments(departments.map((department) =>
                department.id === editedDepartment.id ? editedDepartment : department
            ));
        } else {
            // Adding a new department
            setDepartments([...departments, editedDepartment]);
        }
        handleClose();
    };

    const handleAddDepartment = () => {
        setSelectedDepartment({
            id: Date.now(), // Unique ID for the new department
            name: '',
        });
        setMode('add'); // Set mode to 'add'
    };

    const handleClose = () => {
        setSelectedDepartment(null);
        setMode('');
    };

    return (
        <Fragment>
            <div className={styles.header}>
                <h2 className={styles.heading}>Department Details</h2>
                <button className={styles.addButton} onClick={handleAddDepartment}>
                    Add Department
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableHeader}>Department Name</th>
                            <th className={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {departments.map((department) => (
                            <tr key={department.id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{department.name}</td>
                                <td className={styles.tableCell}>
                                    <button className={styles.editButton} onClick={() => handleEdit(department.id)}>
                                        Edit
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(department.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedDepartment && (
                    <DepartmentModal
                        key={selectedDepartment.id} // Unique key for selected department modal
                        department={selectedDepartment}
                        onClose={handleClose}
                        onSave={handleSave}
                        mode={mode}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Department;
