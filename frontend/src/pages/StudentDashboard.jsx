import { useState, useEffect } from "react";
import SidebarStudent from "../components/SidebarStudent";
import api from "../services/api";

function StudentDashboard() {
  const [view, setView] = useState("classrooms");
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [activeTab, setActiveTab] = useState("stream");
  const [joinCode, setJoinCode] = useState("");

  const [posts, setPosts] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [notes, setNotes] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ LOAD STUDENT CLASSROOMS
  useEffect(() => {
    if (user) {
      api.get(`/api/enrollments/student/${user.id}`)
        .then(res => setClassrooms(res.data))
        .catch(err => console.log(err));
    }
  }, []);

  // ✅ LOAD CLASSROOM DETAILS WHEN SELECTED
  useEffect(() => {
    if (selectedClassroom) {
      api.get(`/api/posts/courses/${selectedClassroom.id}`)
        .then(res => setPosts(res.data));

      api.get(`/api/assignments/courses/${selectedClassroom.id}`)
        .then(res => setAssignments(res.data));

      api.get(`/api/notes/courses/${selectedClassroom.id}`)
        .then(res => setNotes(res.data));
    }
  }, [selectedClassroom]);

  // ✅ JOIN CLASSROOM
  const handleJoinClassroom = async () => {
    if (!joinCode) {
      alert("Please enter classroom code");
      return;
    }

    try {
      await api.post("/api/enrollments/join", {
        studentId: user.id,
        code: joinCode
      });

      alert("Successfully joined class!");

      // reload classrooms
      const res = await api.get(`/api/enrollments/student/${user.id}`);
      setClassrooms(res.data);

      setJoinCode("");
      setView("classrooms");

    } catch (error) {
      alert("Invalid classroom code");
    }
  };

  // ✅ SUBMIT ASSIGNMENT
  const handleSubmitAssignment = async (assignmentId) => {
    const fileName = prompt("Enter assignment file name:");

    if (!fileName) return;

    try {
      await api.post("/api/submissions", {
        assignmentId: assignmentId,
        studentId: user.id,
        fileName: fileName
      });

      alert("Assignment submitted successfully!");

      // reload assignments
      const res = await api.get(
        `/api/assignments/classroom/${selectedClassroom.id}`
      );
      setAssignments(res.data);

    } catch (error) {
      alert("Submission failed");
    }
  };

  // ===============================
  // VIEW 1 — CLASSROOM LIST
  // ===============================
  if (view === "classrooms") {
    return (
      <div className="dashboard">
        <SidebarStudent
          setView={setView}
          setSelectedClassroom={setSelectedClassroom}
          setActiveTab={setActiveTab}
        />

        <div className="content">
          <h2>My Classes</h2>

          <div className="classrooms-grid">
            {classrooms.map(cls => (
              <div
                key={cls.id}
                className="classroom-card"
                onClick={() => {
                  setSelectedClassroom(cls);
                  setView("classroom");
                  setActiveTab("stream");
                }}
              >
                <h3>{cls.name}</h3>
                <p><strong>Code:</strong> {cls.code}</p>
                <p><strong>Faculty:</strong> {cls.facultyName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // VIEW 2 — JOIN CLASS
  // ===============================
  if (view === "join") {
    return (
      <div className="dashboard">
        <SidebarStudent setView={setView} />

        <div className="content">
          <h2>Join a Class</h2>

          <input
            type="text"
            placeholder="Enter class code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          />

          <button onClick={handleJoinClassroom}>Join</button>
          <button onClick={() => setView("classrooms")}>Cancel</button>
        </div>
      </div>
    );
  }

  // ===============================
  // VIEW 3 — CLASSROOM DETAILS
  // ===============================
  if (view === "classroom" && selectedClassroom) {
    return (
      <div className="dashboard">
        <SidebarStudent
          setView={setView}
          setSelectedClassroom={setSelectedClassroom}
          setActiveTab={setActiveTab}
        />

        <div className="content">
          <button onClick={() => setView("classrooms")}>← Back</button>

          <h2>{selectedClassroom.name}</h2>
          <p>Code: {selectedClassroom.code}</p>

          <div className="classroom-tabs">
            <button onClick={() => setActiveTab("stream")}>Stream</button>
            <button onClick={() => setActiveTab("classwork")}>Classwork</button>
            <button onClick={() => setActiveTab("notes")}>Notes</button>
            <button onClick={() => setActiveTab("people")}>People</button>
            <button onClick={() => setActiveTab("grades")}>Grades</button>
          </div>

          {/* STREAM */}
          {activeTab === "stream" && (
            <div>
              {posts.map(post => (
                <div key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <small>{post.createdAt}</small>
                </div>
              ))}
            </div>
          )}

          {/* CLASSWORK */}
          {activeTab === "classwork" && (
            <div>
              {assignments.map(assignment => (
                <div key={assignment.id}>
                  <h4>{assignment.title}</h4>
                  <p>{assignment.description}</p>
                  <p>Due: {assignment.dueDate}</p>

                  {!assignment.submitted && (
                    <button
                      onClick={() =>
                        handleSubmitAssignment(assignment.id)
                      }
                    >
                      Submit
                    </button>
                  )}

                  {assignment.submitted && (
                    <p>✓ Submitted</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* NOTES */}
          {activeTab === "notes" && (
            <div>
              {notes.map(note => (
                <div key={note.id}>
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* PEOPLE */}
          {activeTab === "people" && (
            <div>
              <p>Faculty: {selectedClassroom.facultyName}</p>
            </div>
          )}

          {/* GRADES */}
          {activeTab === "grades" && (
            <div>
              <p>Grades coming soon...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default StudentDashboard;