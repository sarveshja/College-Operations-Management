import React, {useState} from 'react';
const facultyNames = ['Dr. John Smith', 'Dr. Jane Doe', 'Prof. Michael Brown'];
const classroomNumbers = ['101', '102', '103', '104', '105'];

const TimeTable = ({ type }) => {
/* for timetable by department */
const [department, setDepartment] = useState('');
const [year, setYear] = useState('');
const [semester, setSemester] = useState('');
/* for timetable by classroom*/
const [selectedClassroom, setSelectedClassroom] = useState('');
/* for timetable by faculty */
const [selectedFaculty, setSelectedFaculty] = useState('');
/*for timetable by day */
const [selectedDay, setSelectedDay] = useState('');
const [selectedHour, setSelectedHour] = useState('');

    const handleDepartmentChange = (e) => setDepartment(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);
    const handleSemesterChange = (e) => setSemester(e.target.value);

    const handleFacultyChange = (event) => {
        setSelectedFaculty(event.target.value);
    };
    const handleClassroomChange = (event) => {
        setSelectedClassroom(event.target.value);
    };
    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleHourChange = (event) => {
        setSelectedHour(event.target.value);
    };
  return (
    <div>
      <h1>{type}</h1>

      {/* Dummy conditions for each section */}
    {type === 'Time Table by Degree' && (
    <div>
        <h2>Time Table by Degree</h2>
        <div>
        <label>
            Department:
            <select value={department} onChange={handleDepartmentChange}>
            <option value="">Select Department</option>
            <option value="BSc Computer Science">BSc Computer Science</option>
            <option value="MSc">MSc </option>
            <option value="BTech">BTech</option>
            </select>
        </label>
        </div>
        <div>
        <label>
            Year:
            <select value={year} onChange={handleYearChange}>
            <option value="">Select Year</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
            </select>
        </label>
        </div>
        <div>
        <label>
            Semester/Term:
            <select value={semester} onChange={handleSemesterChange}>
            <option value="">Select Semester/Term</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
            <option value="Term 4">Term 4</option>
            </select>
        </label>
        </div>
        <div>
        <h3>Selected Values:</h3>
        <p>Department: {department || "None"}</p>
        <p>Year: {year || "None"}</p>
        <p>Semester/Term: {semester || "None"}</p>
        </div>
    </div>
    )}

    {type === 'Time Table by Faculty' && (
        <div>
        <h2>Time Table for Faculty</h2>
        <p>Select a faculty member to view their time table:</p>
        <select value={selectedFaculty} onChange={handleFacultyChange}>
            <option value="">Select Faculty</option>
            {facultyNames.map((name, index) => (
            <option key={index} value={name}>
                {name}
            </option>
            ))}
        </select>
        {selectedFaculty && (
            <div>
            <h3>Selected Faculty: {selectedFaculty}</h3>
            </div>
        )}
        </div>
    )}

    {type === 'Time Table by Classroom' && (
        <div>
          <h2>Time Table for Classroom</h2>
          <p>Select a classroom number to view its time table:</p>
          <select value={selectedClassroom} onChange={handleClassroomChange}>
            <option value="">Select Classroom</option>
            {classroomNumbers.map((number, index) => (
              <option key={index} value={number}>
                Classroom {number}
              </option>
            ))}
          </select>
          {selectedClassroom && (
            <div>
              <h3>Selected Classroom: {selectedClassroom}</h3>
            </div>
          )}
        </div>
      )}

    {type === 'Time Table by Day' && (
            <div>
            <h2>Time Table for Day</h2>
            <p>Select a day and hour to view the time table:</p>
            <select value={selectedDay} onChange={handleDayChange}>
                <option value="">Select Day</option>
                {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>
                    {day}
                </option>
                ))}
            </select>
            <select value={selectedHour} onChange={handleHourChange}>
                <option value="">Select Hour</option>
                {hoursOfDay.map((hour, index) => (
                <option key={index} value={hour}>
                    {hour}
                </option>
                ))}
            </select>
            {selectedDay && selectedHour && (
                <div>
                <h3>Selected Day: {selectedDay}</h3>
                <h3>Selected Hour: {selectedHour}</h3>
                </div>
            )}
            </div>
        )}
    </div>
  );
};

export default TimeTable;
