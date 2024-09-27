import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="card">
      <div className="list-group list-group-flush">
        <Link
          to="/teacher-dashboard"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </Link>
        <Link
          to="/my-courses"
          className="list-group-item list-group-item-action"
        >
          My Courses
        </Link>
        <Link
          to="/my-courses"
          className="list-group-item list-group-item-action"
        >
          Add Course
        </Link>
        <Link to="/my-users" className="list-group-item list-group-item-action">
          My Students
        </Link>
        <Link
          to="/profile-setting"
          className="list-group-item list-group-item-action"
        >
          Profile Setting
        </Link>
        <Link
          to="/change-password"
          className="list-group-item list-group-item-action"
        >
          Change Password
        </Link>
        <Link
          to="/teacher-login"
          className="list-group-item list-group-item-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
