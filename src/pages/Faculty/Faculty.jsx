import React, { useState, useEffect, Fragment } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../../services/firebaseConfig'; // Ensure this path is correct
import FacultyModal from '../Modal/FacultyModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Faculty.module.css';
import { FaSpinner } from 'react-icons/fa';

const Faculty = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [filteredFaculty, setFilteredFaculty] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [mode, setMode] = useState('');
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const searchField = ['name']; // Field to search by

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'faculty'));
                const facultyList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFacultyList(facultyList);
                setFilteredFaculty(facultyList);
            } catch (error) {
                alert('An error occurred while fetching faculty.');
            } finally {
                setLoading(false);
            }
        };

        fetchFaculty();
    }, []);

    useEffect(() => {
        if (query) {
            handleSearch(query, searchField);
        } else {
            setFilteredFaculty(facultyList);
        }
    }, [query, facultyList]);

    const handleSearch = (query, field) => {
        if (query && field) {
            const filtered = facultyList.filter((faculty) =>
                faculty[field]?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredFaculty(filtered);
        } else {
            setFilteredFaculty(facultyList);
        }
    };

    const handleEdit = (id) => {
        setSelectedFaculty(facultyList.find((faculty) => faculty.id === id));
        setMode('edit');
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this faculty member?');
        if (confirmed) {
            try {
                await deleteDoc(doc(db, 'faculty', id));
                setFacultyList(facultyList.filter((faculty) => faculty.id !== id));
                setFilteredFaculty(filteredFaculty.filter((faculty) => faculty.id !== id));
                alert('Faculty member deleted successfully!');
            } catch (error) {
                alert('An error occurred while deleting the faculty member.');
            }
        }
    };

    const handleSave = async (editedFaculty) => {
        try {
            if (mode === 'edit') {
                const docRef = doc(db, 'faculty', editedFaculty.id);
                await updateDoc(docRef, {
                    name: editedFaculty.name,
                });

                const updatedFacultyList = facultyList.map((faculty) =>
                    faculty.id === editedFaculty.id ? editedFaculty : faculty
                );
                setFacultyList(updatedFacultyList);
                setFilteredFaculty(updatedFacultyList);
                alert('Faculty member updated successfully!');
            } else {
                const docRef = await addDoc(collection(db, 'faculty'), {
                    name: editedFaculty.name
                });
                const newFaculty = { id: docRef.id, name: editedFaculty.name };

                setFacultyList([...facultyList, newFaculty]);
                setFilteredFaculty([...facultyList, newFaculty]);
                alert('Faculty member added successfully!');
            }
        } catch (error) {
            alert('An error occurred while saving the faculty member.');
        } finally {
            handleClose();
        }
    };

    const handleAddFaculty = () => {
        setSelectedFaculty({
            id: '',
            name: '',
        });
        setMode('add');
    };

    const handleClose = () => {
        setSelectedFaculty(null);
        setMode('');
    };

    return (
        <Fragment>
            <div className={styles.header}>
                <h2 className={styles.heading}>Faculty Details</h2>
                <SearchBar query={query} setQuery={setQuery} searchFields={searchField} onSearch={handleSearch} />
                <button className={styles.addButton} onClick={handleAddFaculty}>
                    Add Faculty
                </button>
            </div>

            <div className={styles.tableContainer}>
                {loading ? (
                    <div className={styles.loadingSpinner}><FaSpinner className={styles.spinnerIcon} /></div>
                ) : (
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableHeader}>Faculty Name</th>
                                <th className={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {filteredFaculty.map((faculty) => (
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
                )}
                {selectedFaculty && (
                    <FacultyModal
                        key={selectedFaculty.id}
                        faculty={selectedFaculty}
                        onClose={handleClose}
                        onSave={handleSave}
                        mode={mode}
                        existingFaculties={facultyList}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Faculty;
