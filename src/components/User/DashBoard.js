import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
function Dashboard() {
  document.title = "Language4All-User Dashboard";
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <h3>Welcome, User</h3>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
