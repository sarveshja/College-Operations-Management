// src/pages/Courses/Course.jsx
import React, { useState, useEffect, Fragment } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../../services/firebaseConfig';
import CoursesModal from '../Modal/CoursesModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Courses.module.css';
import { FaSpinner } from 'react-icons/fa';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [mode, setMode] = useState('');
    const [loading, setLoading] = useState(true);

    const searchFields = ['code', 'name']; // Fields to search by

    // Fetch courses from Firestore on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courseCollection = collection(db, 'courses');
                const courseSnapshot = await getDocs(courseCollection);
                const courseList = courseSnapshot.docs.map(doc => ({
                    id: doc.id, // Firestore-generated ID
                    ...doc.data()
                }));
                setCourses(courseList);
                setFilteredCourses(courseList);
            } catch (error) {
                console.error('Error fetching courses:', error);
                alert('An error occurred while fetching courses.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Handle search functionality
    const handleSearch = (query, fields) => {
        if (query) {
            const filtered = courses.filter((course) =>
                fields.some((field) => course[field]?.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredCourses(filtered);
        } else {
            setFilteredCourses(courses);
        }
    };

    // Handle editing a course
    const handleEdit = (id) => {
        const courseToEdit = courses.find((course) => course.id === id);
        setSelectedCourse(courseToEdit);
        setMode('edit');
    };

    // Handle deleting a course
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this course?');
        if (confirmed) {
            try {
                await deleteDoc(doc(db, 'courses', id));
                const updatedCourses = courses.filter((course) => course.id !== id);
                setCourses(updatedCourses);
                setFilteredCourses(updatedCourses);
                alert('Course deleted successfully!');
            } catch (error) {
                console.error('Error deleting course:', error);
                alert('An error occurred while deleting the course.');
            }
        }
    };

    // Handle saving (adding/editing) a course
    const handleSave = async (editedCourse) => {
        try {
            if (mode === 'edit') {
                // Editing an existing course
                const courseDocRef = doc(db, 'courses', editedCourse.id);
                await updateDoc(courseDocRef, {
                    code: editedCourse.code,
                    name: editedCourse.name
                });

                const updatedCourses = courses.map((course) =>
                    course.id === editedCourse.id ? editedCourse : course
                );
                setCourses(updatedCourses);
                setFilteredCourses(updatedCourses);
                alert('Course updated successfully!');
            } else {
                // Adding a new course
                const courseCollection = collection(db, 'courses');
                const docRef = await addDoc(courseCollection, {
                    code: editedCourse.code,
                    name: editedCourse.name
                });
                const newCourse = { id: docRef.id, code: editedCourse.code, name: editedCourse.name };
                setCourses([...courses, newCourse]);
                setFilteredCourses([...courses, newCourse]);
                alert('Course added successfully!');
            }
        } catch (error) {
            console.error('Error saving course:', error);
            alert('An error occurred while saving the course.');
        } finally {
            handleClose();
        }
    };

    // Handle adding a new course
    const handleAddCourse = () => {
        setSelectedCourse({
            code: '',
            name: '',
        });
        setMode('add');
    };

    // Handle closing the modal
    const handleClose = () => {
        setSelectedCourse(null);
        setMode('');
    };

    return (
        <Fragment>
            <div className={styles.header}>
                <h2 className={styles.heading}>Course Details</h2>
                <SearchBar data={courses} searchFields={searchFields} onSearch={handleSearch} />
                <button className={styles.addButton} onClick={handleAddCourse}>
                    Add Course
                </button>
            </div>

            <div className={styles.tableContainer}>
                {loading ? (
                     <div className={styles.loadingSpinner}><FaSpinner className={styles.spinnerIcon} /></div>
                    ) : (
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableHeader}>Course Code</th>
                                <th className={styles.tableHeader}>Course Name</th>
                                <th className={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {filteredCourses.map((course) => (
                                <tr key={course.id} className={styles.tableRow}>
                                    <td className={styles.tableCell}>{course.code}</td>
                                    <td className={styles.tableCell}>{course.name}</td>
                                    <td className={styles.tableCell}>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEdit(course.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(course.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {selectedCourse && (
                    <CoursesModal
                        course={selectedCourse}
                        onClose={handleClose}
                        onSave={handleSave}
                        mode={mode}
                        existingCourses={courses}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Course;
