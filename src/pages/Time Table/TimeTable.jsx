import React, {useState, useEffect} from 'react';
import styles from './TimeTable.module.css';
const facultyNames = ['Dr. John Smith', 'Dr. Jane Doe', 'Prof. Michael Brown'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hoursOfDay = [ '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
const classroomsData = [
  { id: 1, name: 'Language Lab' },
  { id: 2, name: 'Classroom 1' },
  { id: 3, name: 'Classroom 2 - AIML Lab (Lab1)' },
  { id: 4, name: 'Classroom 3 - AIDA Lab (Lab2)' },
  { id: 5, name: 'Classroom 4 - CS Lab (Lab3)' },
  { id: 6, name: 'Classroom 5' },
  { id: 7, name: 'Classroom 6' },
  { id: 8, name: 'Classroom 7 - IOT Lab' },
  { id: 9, name: 'Classroom 8' },
  { id: 10, name: 'Classroom 9 - MED Lab' },
  { id: 11, name: 'Classroom 10' },
  { id: 12, name: 'Classroom 11' },
  { id: 13, name: 'Classroom 12' },
  { id: 14, name: 'Classroom 14' },
  { id: 15, name: 'Classroom 15' },
  { id: 16, name: 'Classroom 16' },
  { id: 17, name: 'Classroom 17' },
  { id: 18, name: 'Classroom 18' },
  { id: 19, name: 'Classroom 19' },
  { id: 20, name: 'Classroom 20' },
  { id: 21, name: 'Classroom 21' },
  { id: 22, name: 'Classroom 22' },
  { id: 23, name: 'Physics Lab' },
  { id: 24, name: 'EHS Classroom 1' },
  { id: 25, name: 'EHS Classroom 2' },
  { id: 26, name: 'EHS Classroom 3' },
  { id: 27, name: 'BIO Department' },
];
const mockClassroomData = [
  { id: 1, classroom: 'Language Lab', day: 'Monday', hour: '09:00 AM', name: 'Mathematics', faculty: 'Dr. John Smith', department: 'BSc Computer Science', year: 'First Year', semester: 'Semester 1' },
  { id: 2, classroom: 'Classroom 1', day: 'Tuesday', hour: '10:00 AM', name: 'Physics', faculty: 'Prof. Michael Brown', department: 'BTech', year: 'Second Year', semester: 'Semester 2' },
  { id: 3, classroom: 'Classroom 2 - AIML Lab (Lab1)', day: 'Wednesday', hour: '11:00 AM', name: 'Chemistry', faculty: 'Dr. Jane Doe', department: 'MSc', year: 'Third Year', semester: 'Term 3' },
  { id: 4, classroom: 'Classroom 3 - AIDA Lab (Lab2)', day: 'Thursday', hour: '12:00 PM', name: 'Computer Science', faculty: 'Dr. John Smith', department: 'BTech', year: 'Fourth Year', semester: 'Term 4' },
  // Add more mock data as needed
];
const TimeTable = ({ type }) => {
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [filteredClassrooms, setFilteredClassrooms] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [filteredTimetable, setFilteredTimetable] = useState([]);
    const [classroomData, setClassroomData] = useState([
      // Existing mock data or can be empty initially
      { id: 1, classroom: 'Language Lab', day: 'Monday', hour: '09:00 AM', name: 'Mathematics', faculty: 'Dr. John Smith', department: 'BSc Computer Science', year: 'First Year', semester: 'Semester 1' },
      { id: 2, classroom: 'Classroom 1', day: 'Tuesday', hour: '10:00 AM', name: 'Physics', faculty: 'Prof. Michael Brown', department: 'BTech', year: 'Second Year', semester: 'Semester 2' },
      { id: 3, classroom: 'Classroom 2 - AIML Lab (Lab1)', day: 'Wednesday', hour: '11:00 AM', name: 'Chemistry', faculty: 'Dr. Jane Doe', department: 'MSc', year: 'Third Year', semester: 'Term 3' },
      { id: 4, classroom: 'Classroom 3 - AIDA Lab (Lab2)', day: 'Thursday', hour: '12:00 PM', name: 'Computer Science', faculty: 'Dr. John Smith', department: 'BTech', year: 'Fourth Year', semester: 'Term 4' },
  
    ]);
    const [isEditing, setIsEditing] = useState(false); // For edit mode
    const [editId, setEditId] = useState(null); // Track which entry is being edited
    // Store updated data into localStorage
    useEffect(() => {
      localStorage.setItem('classroomData', JSON.stringify(classroomData));
    }, [classroomData]);
    useEffect(() => {
      const storedData = localStorage.getItem('classroomData');
      if (storedData) {
        setClassroomData(JSON.parse(storedData));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('classroomData', JSON.stringify(classroomData));
    }, [classroomData]);

    const [newEntry, setNewEntry] = useState({
      classroom: '',
      day: '',
      hour: '',
      name: '',
      faculty: '',
      department: '',
      year: '',
      semester: ''
    });
    // Handler to update the form values
    const handleChange = (e) => {
      setNewEntry({
        ...newEntry,
        [e.target.name]: e.target.value,
      });
    };
    // Handle adding new timetable entry
  const handleAddEntry = () => {
    if (isEditing) {
      setClassroomData(
        classroomData.map((entry) =>
          entry.id === editId ? { ...entry, ...newEntry } : entry
        )
      );
      setIsEditing(false); // Exit edit mode
      setEditId(null); // Reset edit ID
    } else {
      setClassroomData([
        ...classroomData,
        { id: classroomData.length + 1, ...newEntry }
      ]);
    }

    // Reset form
    setNewEntry({
      classroom: '',
      day: '',
      hour: '',
      name: '',
      faculty: '',
      department: '',
      year: '',
      semester: ''
    });
  };
// Handle edit button click
const handleEdit = (id) => {
  const entryToEdit = classroomData.find((entry) => entry.id === id);
  setNewEntry(entryToEdit);
  setIsEditing(true);
  setEditId(id); // Track which entry is being edited
};

// Handle delete button click
const handleDelete = (id) => {
  const updatedData = classroomData.filter((entry) => entry.id !== id);
  setClassroomData(updatedData);
};
  const handleDepartmentChange = (e) => setDepartment(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleSemesterChange = (e) => setSemester(e.target.value);
  const handleFacultyChange = (event) => {
    const facultyName = event.target.value;
    setSelectedFaculty(facultyName);

    const filtered = mockClassroomData.filter((classroom) => classroom.faculty === facultyName);
    setFilteredTimetable(filtered);
  };
  const handleClassroomChange = (event) => setSelectedClassroom(event.target.value);
  const handleDayChange = (event) => setSelectedDay(event.target.value);
  const handleHourChange = (event) => setSelectedHour(event.target.value);


  const handleFilter = () => {
    const filtered = mockClassroomData.filter(
      (classroom) =>
        classroom.classroom === selectedClassroom &&
        classroom.day === selectedDay &&
        classroom.hour === selectedHour
    );
    setFilteredClassrooms(filtered);
  };
  
  const filterTimeTableByDegree = () => {
    const filtered = mockClassroomData.filter(
      (classroom) => classroom.department === department && classroom.year === year && classroom.semester === semester
    );
    setFilteredTimetable(filtered);
  };
 
  return (
    <div>
      <h1>{type}</h1>

      {/* Dummy conditions for each section */}
      {type === 'Time Table by Degree' && (
        <div className='dropdown-container'>
          <div className='select-container'>
            <select value={department} onChange={handleDepartmentChange}>
              <option value="">Select Department</option>
              <option value="BSc Computer Science">BSc Computer Science</option>
              <option value="MSc">MSc</option>
              <option value="BTech">BTech</option>
            </select>
          </div>

        {department && (
          <div className='select-container'>
            <select value={year} onChange={handleYearChange}>
              <option value="">Select Year</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
            </select>
          </div>
        )}

        {year && (
          <div className='select-container'>
            <select value={semester} onChange={handleSemesterChange}>
              <option value="">Select Semester/Term</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
              <option value="Term 4">Term 4</option>
            </select>
          </div>
        )}

        {department && year && semester && (
          <button onClick={filterTimeTableByDegree}>View Time Table</button>
        )}

        {department && year && semester && (
          <div className={styles.tableContainer}>
            <h3>Time Table for {department} - {year}, {semester}</h3>
            {filteredTimetable.length > 0 ? (
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableHeader}>Classroom</th>
                    <th className={styles.tableHeader}>Course</th>
                    <th className={styles.tableHeader}>Day</th>
                    <th className={styles.tableHeader}>Hour</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {filteredTimetable.map((classroom) => (
                    <tr key={classroom.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{classroom.classroom}</td>
                      <td className={styles.tableCell}>{classroom.name}</td>
                      <td className={styles.tableCell}>{classroom.day}</td>
                      <td className={styles.tableCell}>{classroom.hour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
)}

    {type === 'Time Table by Faculty' && (
        <div className="select-container">
          <p>Select a faculty member to view their time table:</p>
          <select value={selectedFaculty} onChange={handleFacultyChange}>
            <option value="">Select Faculty</option>
            {facultyNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* Display timetable if a faculty is selected */}
          {selectedFaculty && (
            <div className={styles.tableContainer}>
              <h3>Time Table for {selectedFaculty}</h3>
              {filteredTimetable.length > 0 ? (
                <table className={styles.table}>
                  <thead className={styles.tableHead}>
                    <tr className={styles.tableRow}>
                      <th className={styles.tableHeader}>Classroom</th>
                      <th className={styles.tableHeader}>Course</th>
                      <th className={styles.tableHeader}>Day</th>
                      <th className={styles.tableHeader}>Hour</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tableBody}>
                    {filteredTimetable.map((classroom) => (
                      <tr key={classroom.id} className={styles.tableRow}>
                        <td className={styles.tableCell}>{classroom.classroom}</td>
                        <td className={styles.tableCell}>{classroom.name}</td>
                        <td className={styles.tableCell}>{classroom.day}</td>
                        <td className={styles.tableCell}>{classroom.hour}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No classes found for {selectedFaculty}.</p>
              )}
            </div>
          )}
        </div>
      )}

    {type === 'Time Table by Day' && (
        <div>
          <div className="select-container">
              <select value={selectedClassroom} onChange={handleClassroomChange}>
                  <option value="">Select Classroom</option>
                  {classroomsData.map((classroom) => (
                      <option key={classroom.id} value={classroom.name}>
                          {classroom.name}
                      </option>
                  ))}
              </select>

              {selectedClassroom && (
                
                  <select value={selectedDay} onChange={handleDayChange}>
                      <option value="">Select Day</option>
                      {daysOfWeek.map((day, index) => (
                          <option key={index} value={day}>
                              {day}
                          </option>
                      ))}
                  </select>
              )}

              {selectedClassroom && selectedDay && (
                  <select value={selectedHour} onChange={handleHourChange}>
                      <option value="">Select Hour</option>
                      {hoursOfDay.map((hour, index) => (
                          <option key={index} value={hour}>
                              {hour}
                          </option>
                      ))}
                  </select>
              )}
          </div>

          {selectedClassroom && selectedDay && selectedHour && (
              <button onClick={handleFilter}>View Timetable</button>
          )}

          
          
          {filteredClassrooms.length > 0 && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableHeader}>Classroom</th>
                    <th className={styles.tableHeader}>Course</th>
                    <th className={styles.tableHeader}>Day</th>
                    <th className={styles.tableHeader}>Hour</th>
                    <th className={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {filteredClassrooms.map((classroom) => (
                    <tr key={classroom.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{classroom.classroom}</td>
                      <td className={styles.tableCell}>{classroom.name}</td>
                      <td className={styles.tableCell}>{classroom.day}</td>
                      <td className={styles.tableCell}>{classroom.hour}</td>
                      <td className={styles.tableCell}>
                        <button className={styles.editButton} onClick={() => alert('Edit feature coming soon')}>
                          Edit
                        </button>
                        <button className={styles.deleteButton} onClick={() => alert('Delete feature coming soon')}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


        </div>
      )}
{type === 'Time Table by Classroom' && (
  <div className={styles.selectContainer}>

    {/* Select Classroom Dropdown */}
    <p>Select a classroom:</p>
    <select value={selectedClassroom} onChange={handleClassroomChange}>
      <option value="">Select Classroom</option>
      {classroomsData.map((classroom) => (
        <option key={classroom.id} value={classroom.name}>
          {classroom.name}
        </option>
      ))}
    </select>

    {/* Show table after selecting a classroom */}
    {selectedClassroom && (
      <div className={styles.tableContainer}>
        <h3>Classes Scheduled in {selectedClassroom}</h3>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th className={styles.tableHeader}>Classroom</th>
              <th className={styles.tableHeader}>Course</th>
              <th className={styles.tableHeader}>Day</th>
              <th className={styles.tableHeader}>Time</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {/* Dummy data for example */}
            {mockClassroomData
              .filter((classroom) => classroom.classroom === selectedClassroom)
              .map((classData) => (
                <tr key={classData.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{classData.classroom}</td>
                  <td className={styles.tableCell}>{classData.name}</td>
                  <td className={styles.tableCell}>{classData.day}</td>
                  <td className={styles.tableCell}>{classData.hour}</td>
                  
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


    {type === 'Add Time Table' &&(
       <div>
       <h2>{isEditing ? "Edit Timetable Entry" : "Add Timetable Entry"}</h2>
      <div className="form-container">
        <input type="text" name="classroom" value={newEntry.classroom} onChange={handleChange} placeholder="Classroom" />
        <input type="text" name="day" value={newEntry.day} onChange={handleChange} placeholder="Day" />
        <input type="text" name="hour" value={newEntry.hour} onChange={handleChange} placeholder="Hour" />
        <input type="text" name="name" value={newEntry.name} onChange={handleChange} placeholder="Course Name" />
        <input type="text" name="faculty" value={newEntry.faculty} onChange={handleChange} placeholder="Faculty Name" />
        <input type="text" name="department" value={newEntry.department} onChange={handleChange} placeholder="Department" />
        <input type="text" name="year" value={newEntry.year} onChange={handleChange} placeholder="Year" />
        <input type="text" name="semester" value={newEntry.semester} onChange={handleChange} placeholder="Semester/Term" />
        <button onClick={handleAddEntry}>{isEditing ? "Update Timetable Entry" : "Add Timetable Entry"}</button>
      </div>
 
       {/* Display the timetable in a table */}
       <div className={styles.tableContainer}>
         <table className={styles.table}>
           <thead className={styles.tableHead}>
             <tr className={styles.tableRow}>
               <th className={styles.tableHeader}>Classroom</th>
               <th className={styles.tableHeader}>Course</th>
               <th className={styles.tableHeader}>Day</th>
               <th className={styles.tableHeader}>Hour</th>
               <th className={styles.tableHeader}>Faculty</th>
               <th className={styles.tableHeader}>Department</th>
               <th className={styles.tableHeader}>Year</th>
               <th className={styles.tableHeader}>Semester</th>
               <th className={styles.tableHeader}>Actions</th>
             </tr>
           </thead>
           <tbody className={styles.tableBody}>
             {classroomData.map((classroom) => (
               <tr key={classroom.id} className={styles.tableRow}>
                 <td className={styles.tableCell}>{classroom.classroom}</td>
                 <td className={styles.tableCell}>{classroom.name}</td>
                 <td className={styles.tableCell}>{classroom.day}</td>
                 <td className={styles.tableCell}>{classroom.hour}</td>
                 <td className={styles.tableCell}>{classroom.faculty}</td>
                 <td className={styles.tableCell}>{classroom.department}</td>
                 <td className={styles.tableCell}>{classroom.year}</td>
                 <td className={styles.tableCell}>{classroom.semester}</td>
                 <td>
                  <button onClick={() => handleEdit(classroom.id)}>Edit</button>
                  <button onClick={() => handleDelete(classroom.id)}>Delete</button>
                </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
    )}
    </div>
  );
};

export default TimeTable;
