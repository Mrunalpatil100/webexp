import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [rollno, setRollno] = useState("");
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/students`
      );

      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (event) => {
    event.preventDefault();

    if (!username || !rollno) {
      setMessage("Please enter Username and Roll Number");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/students`,
        {
          username: username,
          rollno: rollno
        }
      );

      setMessage("Student added successfully");

      setUsername("");
      setRollno("");

      fetchStudents();
    } catch (error) {
      console.error(error);
      setMessage("Unable to add student");
    }
  };

  return (
    <div className="container">
      <h1>MERN Student Application</h1>

      <form onSubmit={addStudent}>
        <label>Username</label>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Roll Number</label>

        <input
          type="text"
          placeholder="Enter roll number"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
        />

        <button type="submit">
          Add Student
        </button>
      </form>

      <p>{message}</p>

      <h2>Student Records</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Roll Number</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.username}</td>
              <td>{student.rollno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;