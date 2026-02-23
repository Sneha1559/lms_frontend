import { useState } from "react";
import SidebarStudent from "../components/SidebarStudent";

function StudentDashboard() {
  const [view, setView] = useState("classrooms");
  const [classrooms, setClassrooms] = useState([
    { id: 1, name: "Web Development 101", code: "WEB101", teacher: "Dr. Smith", room: "101" },
    { id: 2, name: "Data Structures", code: "DS102", teacher: "Prof. Johnson", room: "102" }
  ]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [activeTab, setActiveTab] = useState("stream");
  const [joinCode, setJoinCode] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, type: "announcement", title: "Welcome", content: "Welcome to the class!", author: "Dr. Smith", date: "Feb 23" }
  ]);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", description: "Complete chapter 1", dueDate: "Feb 28", status: "pending", submitted: false, submissionDate: "", fileName: "" }
  ]);

  const [notes, setNotes] = useState([
    { id: 1, title: "Introduction to Web Dev", content: "Chapter 1 notes", uploadedDate: "Feb 20", fileName: "Chapter1_Notes.pdf" }
  ]);

  const handleJoinClassroom = () => {
    if (joinCode) {
      const newClass = {
        id: classrooms.length + 1,
        name: `Class ${joinCode}`,
        code: joinCode,
        teacher: "Unknown",
        room: "--"
      };
      setClassrooms([...classrooms, newClass]);
      setJoinCode("");
      alert(`Successfully joined class with code: ${joinCode}`);
      setView("classrooms");
    } else {
      alert("Please enter a classroom code");
    }
  };

  const handleSubmitAssignment = (assignmentId) => {
    const fileName = prompt("Enter assignment file name (e.g., Assignment1.pdf):");
    if (fileName) {
      setAssignments(assignments.map(a => 
        a.id === assignmentId 
          ? {
              ...a, 
              status: "submitted", 
              submitted: true, 
              submissionDate: new Date().toLocaleDateString(), 
              fileName: fileName 
            } 
          : a
      ));
      alert("Assignment submitted successfully!");
    }
  };

  if (view === "classrooms") {
    return (
      <div className="dashboard">
        <SidebarStudent setView={setView} setSelectedClassroom={setSelectedClassroom} setActiveTab={setActiveTab} />
        
        <div className="content">
          <div className="header-section">
            <h2>My Classes</h2>
          </div>

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
                <div className="classroom-card-header">
                  <h3>{cls.name}</h3>
                </div>
                <div className="classroom-card-body">
                  <p><strong>Teacher:</strong> {cls.teacher}</p>
                  <p><strong>Code:</strong> {cls.code}</p>
                  <p><strong>Room:</strong> {cls.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "join") {
    return (
      <div className="dashboard">
        <SidebarStudent setView={setView} />
        
        <div className="content">
          <h2>Join a Class</h2>
          <div>
            <p className="form-info">Ask your teacher for the class code to join their class.</p>
            <input 
              type="text" 
              placeholder="Enter class code" 
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            />
            <button onClick={handleJoinClassroom}>Join Class</button>
            <button onClick={() => setView("classrooms")}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "classroom" && selectedClassroom) {
    return (
      <div className="dashboard">
        <SidebarStudent setView={setView} setSelectedClassroom={setSelectedClassroom} setActiveTab={setActiveTab} />
        
        <div className="content">
          <div className="classroom-header">
            <button className="back-btn" onClick={() => setView("classrooms")}>← Back</button>
            <h2>{selectedClassroom.name}</h2>
            <span className="class-info">Teacher: {selectedClassroom.teacher} | Code: {selectedClassroom.code}</span>
          </div>

          <div className="classroom-tabs">
            <button 
              className={`tab ${activeTab === "stream" ? "active" : ""}`}
              onClick={() => setActiveTab("stream")}
            >
              Stream
            </button>
            <button 
              className={`tab ${activeTab === "notes" ? "active" : ""}`}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </button>
            <button 
              className={`tab ${activeTab === "classwork" ? "active" : ""}`}
              onClick={() => setActiveTab("classwork")}
            >
              Classwork
            </button>
            <button 
              className={`tab ${activeTab === "people" ? "active" : ""}`}
              onClick={() => setActiveTab("people")}
            >
              People
            </button>
            <button 
              className={`tab ${activeTab === "grades" ? "active" : ""}`}
              onClick={() => setActiveTab("grades")}
            >
              Grades
            </button>
          </div>

          {activeTab === "stream" && (
            <div className="tab-content">
              {posts.map(post => (
                <div key={post.id} className="post">
                  <div className="post-avatar">S</div>
                  <div className="post-content">
                    <div className="post-header">
                      <h4>{post.author}</h4>
                      <span className="post-date">{post.date}</span>
                    </div>
                    <p className="post-title">{post.title}</p>
                    <p className="post-body">{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "classwork" && (
            <div className="tab-content">
              <h3>Classwork</h3>
              {assignments.map(assignment => (
                <div key={assignment.id} className="assignment-item-student">
                  <div className="assignment-icon">📝</div>
                  <div className="assignment-details">
                    <h4>{assignment.title}</h4>
                    <p>{assignment.description}</p>
                    <span className={`status ${assignment.status}`}>
                      {assignment.submitted 
                        ? `✓ Submitted on ${assignment.submissionDate}` 
                        : `Due: ${assignment.dueDate}`
                      }
                    </span>
                    {assignment.submitted && (
                      <div className="submission-info">
                        <p>📎 File: {assignment.fileName}</p>
                      </div>
                    )}
                  </div>
                  {!assignment.submitted && (
                    <button 
                      className="btn-small" 
                      onClick={() => handleSubmitAssignment(assignment.id)}
                    >
                      Submit Assignment
                    </button>
                  )}
                  {assignment.submitted && (
                    <button className="btn-small" disabled>Submitted</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="tab-content">
              <h3>Study Notes</h3>
              {notes.length > 0 ? (
                notes.map(note => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <h4>📄 {note.title}</h4>
                      <span className="note-date">{note.uploadedDate}</span>
                    </div>
                    <p>{note.content}</p>
                    <div className="note-file">
                      <span>📎 {note.fileName}</span>
                      <button className="btn-small">Download</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No notes uploaded yet.</p>
              )}
            </div>
          )}

          {activeTab === "people" && (
            <div className="tab-content">
              <h3>People</h3>
              <div className="people-section">
                <h4>Teachers</h4>
                <div className="person">
                  <div className="avatar">T</div>
                  <div className="person-info">
                    <h5>{selectedClassroom.teacher}</h5>
                    <p>Teacher</p>
                  </div>
                </div>

                <h4 style={{marginTop: "20px"}}>Students</h4>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="person">
                    <div className="avatar">S</div>
                    <div className="person-info">
                      <h5>Student {i + 1}</h5>
                      <p>Student</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "grades" && (
            <div className="tab-content">
              <h3>Your Grades</h3>
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Grade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment, i) => (
                    <tr key={i}>
                      <td>{assignment.title}</td>
                      <td>--</td>
                      <td>{assignment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default StudentDashboard;