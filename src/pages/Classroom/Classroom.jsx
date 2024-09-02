import React, { useState, useEffect, Fragment } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../../services/firebaseConfig';
import ClassroomModal from '../Modal/ClassroomModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Classroom.module.css';

const Classroom = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [filteredClassrooms, setFilteredClassrooms] = useState([]);
    const [selectedClassroom, setSelectedClassroom] = useState(null);
    const [mode, setMode] = useState('');
    const [loading, setLoading] = useState(true);
    const searchField = ['name']; // Field to search by
 
    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'classrooms'));
                const classroomsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setClassrooms(classroomsList);
                setFilteredClassrooms(classroomsList);
            } catch (error) {
                alert('An error occurred while fetching classrooms.');
            } finally {
                setLoading(false);
            }
        };

        fetchClassrooms();
    }, []);

    const handleSearch = (query, field) => {
        if (query && field) {
            const filtered = classrooms.filter((classroom) =>
                classroom[field]?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredClassrooms(filtered);
        } else {
            setFilteredClassrooms(classrooms);
        }
    };

    const handleEdit = (id) => {
        setSelectedClassroom(classrooms.find((classroom) => classroom.id === id));
        setMode('edit');
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this classroom?');
        if (confirmed) {
            try {
                await deleteDoc(doc(db, 'classrooms', id));
                setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
                setFilteredClassrooms(filteredClassrooms.filter((classroom) => classroom.id !== id));
                alert('Classroom deleted successfully!');
            } catch (error) {
                alert('An error occurred while deleting the classroom.');
            }
        }
    };

    const handleSave = async (editedClassroom) => {
        try {
            if (mode === 'edit') {
                const docRef = doc(db, 'classrooms', editedClassroom.id);
                await updateDoc(docRef, {
                    name: editedClassroom.name,
                    id: editedClassroom.id,
                });

                const updatedClassrooms = classrooms.map((classroom) =>
                    classroom.id === editedClassroom.id ? editedClassroom : classroom
                );
                setClassrooms(updatedClassrooms);
                setFilteredClassrooms(updatedClassrooms);
                alert('Classroom updated successfully!');
            } else {
                const docRef = await addDoc(collection(db, 'classrooms'), {
                    name: editedClassroom.name
                });
                const newClassroom = { id: docRef.id, name: editedClassroom.name };

                await updateDoc(doc(db, 'classrooms', docRef.id), {
                    id: docRef.id
                });

                setClassrooms([...classrooms, newClassroom]);
                setFilteredClassrooms([...classrooms, newClassroom]);
                alert('Classroom added successfully!');
            }
        } catch (error) {
            alert('An error occurred while saving the classroom.');
        } finally {
            handleClose();
        }
    };

    const handleAddClassroom = () => {
        setSelectedClassroom({
            id: '',
            name: '',
        });
        setMode('add');
    };

    const handleClose = () => {
        setSelectedClassroom(null);
        setMode('');
    };

    return (
        <Fragment>
            <div className={styles.header}>
                <h2 className={styles.heading}>Classroom Details</h2>
                <div classroom={styles.searchBar_container}></div>
                <SearchBar data={classrooms} searchFields={searchField} onSearch={handleSearch} />
                <button className={styles.addButton} onClick={handleAddClassroom}>
                    Add Classroom
                </button>
            </div>

            <div className={styles.tableContainer}>
                {loading ? (
                    <div className={styles.loadingSpinner}>Loading...</div>
                ) : (
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableHeader}>Classroom Name</th>
                                <th className={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {filteredClassrooms.map((classroom) => (
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
                )}
                {selectedClassroom && (
                    <ClassroomModal
                        key={selectedClassroom.id}
                        classroom={selectedClassroom}
                        onClose={handleClose}
                        onSave={handleSave}
                        mode={mode}
                        existingClassrooms={classrooms}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Classroom;
