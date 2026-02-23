function SidebarFaculty({ setView, setSelectedClassroom, setActiveTab }) {
  return (
    <div className="sidebar">
      <h3>Teach</h3>
      <button onClick={() => {
        setView("classrooms");
        setSelectedClassroom(null);
      }}>My Classrooms</button>
      <button onClick={() => setView("create")}>+ Create Class</button>
      
      <h3 style={{marginTop: "30px"}}>Calendar</h3>
      <div className="sidebar-calendar">
        <p style={{fontSize: "12px", color: "#999"}}>Coming Soon</p>
      </div>

      <h3 style={{marginTop: "30px"}}>Help & Feedback</h3>
      <button style={{opacity: 0.7}}>Help Center</button>
      <button style={{opacity: 0.7}}>Send Feedback</button>
    </div>
  );
}

export default SidebarFaculty;