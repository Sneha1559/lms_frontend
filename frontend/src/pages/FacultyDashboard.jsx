import { useState } from "react";
import SidebarFaculty from "../components/SidebarFaculty";

function FacultyDashboard() {
  const [view, setView] = useState("classrooms");
  const [classrooms, setClassrooms] = useState([
    { id: 1, name: "Web Development 101", code: "WEB101", section: "A", room: "101", students: 35 },
    { id: 2, name: "Data Structures", code: "DS102", section: "B", room: "102", students: 28 }
  ]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [activeTab, setActiveTab] = useState("stream");
  const [newClassroom, setNewClassroom] = useState({ name: "", code: "", section: "", room: "" });
  const [posts, setPosts] = useState([
    { id: 1, type: "announcement", title: "Welcome to Class", content: "Welcome everyone!", date: "Feb 23, 2024", author: "Faculty" }
  ]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", description: "Complete chapter 1-3", dueDate: "Feb 28", submitted: 12, total: 35 }
  ]);
  const [newAssignment, setNewAssignment] = useState({ title: "", description: "", dueDate: "" });
  const [notes, setNotes] = useState([
    { id: 1, title: "Introduction to Web Dev", content: "Chapter 1 notes", uploadedDate: "Feb 20", fileName: "Chapter1_Notes.pdf" }
  ]);
  const [newNote, setNewNote] = useState({ title: "", content: "", fileName: "" });

  const handleCreateClassroom = () => {
    if (newClassroom.name && newClassroom.code) {
      setClassrooms([...classrooms, {
        id: classrooms.length + 1,
        ...newClassroom,
        students: 0
      }]);
      setNewClassroom({ name: "", code: "", section: "", room: "" });
      alert("Classroom created successfully!");
    } else {
      alert("Please fill in classroom name and code");
    }
  };

  const handlePostAnnouncement = () => {
    if (newPost.title || newPost.content) {
      setPosts([{
        id: posts.length + 1,
        type: "announcement",
        title: newPost.title || "Announcement",
        content: newPost.content,
        date: new Date().toLocaleDateString(),
        author: "Faculty"
      }, ...posts]);
      setNewPost({ title: "", content: "" });
    }
  };

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate) {
      setAssignments([{
        id: assignments.length + 1,
        ...newAssignment,
        submitted: 0,
        total: selectedClassroom?.students || 0,
        submissions: []
      }, ...assignments]);
      setNewAssignment({ title: "", description: "", dueDate: "" });
      alert("Assignment created and assigned to students!");
    } else {
      alert("Please fill in assignment title and due date");
    }
  };

  const handleUploadNote = () => {
    if (newNote.title && (newNote.content || newNote.fileName)) {
      setNotes([{
        id: notes.length + 1,
        title: newNote.title,
        content: newNote.content,
        fileName: newNote.fileName || "notes.pdf",
        uploadedDate: new Date().toLocaleDateString()
      }, ...notes]);
      setNewNote({ title: "", content: "", fileName: "" });
      alert("Notes uploaded successfully!");
    } else {
      alert("Please fill in note title and add content or file");
    }
  };

  if (view === "classrooms") {
    return (
      <div className="dashboard">
        <SidebarFaculty setView={setView} setSelectedClassroom={setSelectedClassroom} setActiveTab={setActiveTab} />
        
        <div className="content">
          <div className="header-section">
            <h2>My Classrooms</h2>
            <button className="btn-primary" onClick={() => setView("create")}>+ Create Class</button>
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
                  <span className="class-code">{cls.code}</span>
                </div>
                <div className="classroom-card-body">
                  <p><strong>Section:</strong> {cls.section || "—"}</p>
                  <p><strong>Room:</strong> {cls.room || "—"}</p>
                  <p><strong>Students:</strong> {cls.students}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "create") {
    return (
      <div className="dashboard">
        <SidebarFaculty setView={setView} />
        
        <div className="content">
          <h2>Create New Classroom</h2>
          <div>
            <input 
              type="text" 
              placeholder="Class Name" 
              value={newClassroom.name}
              onChange={(e) => setNewClassroom({...newClassroom, name: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Class Code" 
              value={newClassroom.code}
              onChange={(e) => setNewClassroom({...newClassroom, code: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Section" 
              value={newClassroom.section}
              onChange={(e) => setNewClassroom({...newClassroom, section: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Room Number" 
              value={newClassroom.room}
              onChange={(e) => setNewClassroom({...newClassroom, room: e.target.value})}
            />
            <button onClick={handleCreateClassroom}>Create Classroom</button>
            <button onClick={() => setView("classrooms")}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "classroom" && selectedClassroom) {
    return (
      <div className="dashboard">
        <SidebarFaculty setView={setView} setSelectedClassroom={setSelectedClassroom} setActiveTab={setActiveTab} />
        
        <div className="content">
          <div className="classroom-header">
            <button className="back-btn" onClick={() => setView("classrooms")}>← Back to Classrooms</button>
            <h2>{selectedClassroom.name}</h2>
            <span className="class-info">Code: {selectedClassroom.code}</span>
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
              <div className="post-card">
                <h3>Create Announcement</h3>
                <input 
                  type="text" 
                  placeholder="Title (optional)" 
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
                <textarea 
                  placeholder="Share something with your class..." 
                  rows="4"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
                <button onClick={handlePostAnnouncement}>Post</button>
              </div>

              {posts.map(post => (
                <div key={post.id} className="post">
                  <div className="post-header">
                    <h4>{post.title}</h4>
                    <span className="post-date">{post.date}</span>
                  </div>
                  <p>{post.content}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="tab-content">
              <div className="post-card">
                <h3>Upload Study Notes</h3>
                <input 
                  type="text" 
                  placeholder="Note Title (e.g., Chapter 1 Notes)" 
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                />
                <textarea 
                  placeholder="Note content or description..." 
                  rows="4"
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="File name (e.g., Chapter1.pdf)" 
                  value={newNote.fileName}
                  onChange={(e) => setNewNote({...newNote, fileName: e.target.value})}
                />
                <button onClick={handleUploadNote}>Upload Notes</button>
              </div>

              {notes.map(note => (
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
              ))}
            </div>
          )}

          {activeTab === "classwork" && (
            <div className="tab-content">
              <div className="assignment-form">
                <h3>Create Assignment</h3>
                <input 
                  type="text" 
                  placeholder="Assignment Title" 
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                />
                <textarea 
                  placeholder="Description" 
                  rows="4"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                />
                <input 
                  type="date" 
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                />
                <button onClick={handleAddAssignment}>Create Assignment</button>
              </div>

              {assignments.map(assignment => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-header">
                    <h4>{assignment.title}</h4>
                    <span className="due-date">Due: {assignment.dueDate}</span>
                  </div>
                  <p>{assignment.description}</p>
                  <div className="assignment-stats">
                    <span className="stat-label">Submissions: {assignment.submitted} out of {assignment.total}</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: `${(assignment.submitted/assignment.total) * 100}%`}}></div>
                    </div>
                  </div>
                  <div className="assignment-actions">
                    <button className="btn-small">View Submissions</button>
                    <button className="btn-small">Grade Assignment</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "people" && (
            <div className="tab-content">
              <h3>Class Members ({selectedClassroom.students + 1})</h3>
              <div className="people-section">
                <div className="person">
                  <div className="avatar">F</div>
                  <div className="person-info">
                    <h4>You (Educator)</h4>
                    <p>Instructor</p>
                  </div>
                </div>
                {[...Array(selectedClassroom.students)].map((_, i) => (
                  <div key={i} className="person">
                    <div className="avatar">S</div>
                    <div className="person-info">
                      <h4>Student {i + 1}</h4>
                      <p>Student</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "grades" && (
            <div className="tab-content">
              <h3>Grades</h3>
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Assignment 1</th>
                    <th>Assignment 2</th>
                    <th>Overall Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td>Student {i + 1}</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
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

export default FacultyDashboard;