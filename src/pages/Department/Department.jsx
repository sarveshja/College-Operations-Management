// src/components/Department/Department.jsx

import React, { useState, useEffect, Fragment } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../../services/firebaseConfig';
import DepartmentModal from '../Modal/DepartmentModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Department.module.css';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [mode, setMode] = useState('');
    const [loading, setLoading] = useState(true);
    const searchField = ['name']; // Field to search by

    // Fetch departments from Firestore on component mount
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const departmentCollection = collection(db, 'departments');
                const departmentSnapshot = await getDocs(departmentCollection);
                const departmentList = departmentSnapshot.docs.map(doc => ({
                    id: doc.id, // Firestore-generated ID
                    ...doc.data()
                }));
                setDepartments(departmentList);
                setFilteredDepartments(departmentList);
            } catch (error) {
                console.error('Error fetching departments:', error);
                alert('An error occurred while fetching departments.');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    // Handle search functionality
    const handleSearch = (query, field) => {
        if (query && field) {
            const filtered = departments.filter((department) =>
                department[field]?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredDepartments(filtered);
        } else {
            setFilteredDepartments(departments);
        }
    };

    // Handle editing a department
    const handleEdit = (id) => {
        const departmentToEdit = departments.find((department) => department.id === id);
        setSelectedDepartment(departmentToEdit);
        setMode('edit');
    };

    // Handle deleting a department
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this department?');
        if (confirmed) {
            try {
                await deleteDoc(doc(db, 'departments', id));
                const updatedDepartments = departments.filter((department) => department.id !== id);
                setDepartments(updatedDepartments);
                setFilteredDepartments(updatedDepartments);
                alert('Department deleted successfully!');
            } catch (error) {
                console.error('Error deleting department:', error);
                alert('An error occurred while deleting the department.');
            }
        }
    };

    // Handle saving (adding/editing) a department
    const handleSave = async (editedDepartment) => {
        try {
            if (mode === 'edit') {
                // Editing an existing department
                const departmentDocRef = doc(db, 'departments', editedDepartment.id);
                await updateDoc(departmentDocRef, {
                    name: editedDepartment.name
                });

                const updatedDepartments = departments.map((department) =>
                    department.id === editedDepartment.id ? editedDepartment : department
                );
                setDepartments(updatedDepartments);
                setFilteredDepartments(updatedDepartments);
                alert('Department updated successfully!');
            } else {
                // Adding a new department
                const departmentCollection = collection(db, 'departments');
                const docRef = await addDoc(departmentCollection, {
                    name: editedDepartment.name
                });
                const newDepartment = { id: docRef.id, name: editedDepartment.name };
                setDepartments([...departments, newDepartment]);
                setFilteredDepartments([...departments, newDepartment]);
                alert('Department added successfully!');
            }
        } catch (error) {
            console.error('Error saving department:', error);
            alert('An error occurred while saving the department.');
        } finally {
            handleClose();
        }
    };

    // Handle adding a new department
    const handleAddDepartment = () => {
        setSelectedDepartment({
            name: '',
        });
        setMode('add');
    };

    // Handle closing the modal
    const handleClose = () => {
        setSelectedDepartment(null);
        setMode('');
    };

    return (
        <Fragment>
            <div className={styles.header}>
                <h2 className={styles.heading}>Department Details</h2>
                <SearchBar data={departments} searchFields={searchField} onSearch={handleSearch} />
                <button className={styles.addButton} onClick={handleAddDepartment}>
                    Add Department
                </button>
            </div>

            <div className={styles.tableContainer}>
                {loading ? (
                    <div className={styles.loadingSpinner}>Loading...</div>
                ) : (
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableHeader}>Department Name</th>
                                <th className={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {filteredDepartments.map((department) => (
                                <tr key={department.id} className={styles.tableRow}>
                                    <td className={styles.tableCell}>{department.name}</td>
                                    <td className={styles.tableCell}>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEdit(department.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(department.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {selectedDepartment && (
                    <DepartmentModal
                        department={selectedDepartment}
                        onClose={handleClose}
                        onSave={handleSave}
                        mode={mode}
                        existingDepartments={departments}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Department;
