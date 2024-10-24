import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MyCourses() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
    <section className="col-md-9">
    <div className="card">
      <h5 className="card-header">My Courses</h5>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Enrolled Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>
                <Link to="/">English Language</Link>
              </td>
              <td>
                <button className="btn btn-primary btn-danger active">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </section>
    </div>
    </div>
  );
}