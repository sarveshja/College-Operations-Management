import React, { useState, Fragment } from 'react';
import CourseModal from '../Modal/CoursesModal';
import styles from './Courses.module.css';
import { courseData } from './coursesData'; // Import your course data

const Course = () => {
    const [courses, setCourses] = useState(courseData);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [mode, setMode] = useState('');

    const handleEdit = (id) => {
        setSelectedCourse(courses.find((course) => course.id === id));
        setMode('edit');
    };

    const handleDelete = (id) => {
        setCourses(courses.filter((course) => course.id !== id));
    };

    const handleSave = (editedCourse) => {
        if (editedCourse.id) {
            // Editing an existing course
            setCourses(courses.map((course) =>
                course.id === editedCourse.id ? editedCourse : course
            ));
        } else {
            // Adding a new course
            setCourses([...courses, editedCourse]);
        }
        handleClose();
    };

    const handleAddCourse = () => {
        setSelectedCourse({
            id: Date.now(), // Unique ID for the new course
            code: '',
            name: '',
        });
        setMode('add'); // Set mode to 'add'
    };

    const handleClose = () => {
        setSelectedCourse(null);
        setMode('');
    };

    return (
        <Fragment>
            <div className={styles.header}>
                <h2 className={styles.heading}>Course Details</h2>
                <button className={styles.addButton} onClick={handleAddCourse}>
                    Add Course
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableHeader}>Course Code</th>
                            <th className={styles.tableHeader}>Course Name</th>
                            <th className={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {courses.map((course) => (
                            <tr key={course.id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{course.code}</td>
                                <td className={styles.tableCell}>{course.name}</td>
                                <td className={styles.tableCell}>
                                    <button className={styles.editButton} onClick={() => handleEdit(course.id)}>
                                        Edit
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(course.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedCourse && (
                    <CourseModal
                        key={selectedCourse.id} // Unique key for selected course modal
                        course={selectedCourse}
                        onClose={handleClose}
                        onSave={handleSave}
                        mode={mode}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Course;
