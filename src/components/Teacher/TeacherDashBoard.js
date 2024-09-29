import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect } from "react";
function TeacherDashboard() {
  document.title = "Language4All-Teacher Dashboard";
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <h3>Welcome, Teacher</h3>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
