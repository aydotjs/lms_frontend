import React from "react";
import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
const baseUrl = "http://127.0.0.1:8000/api";
import axios from "axios";
export default function TeacherCourses() {
  const [courseData, setCourseData] = useState([])
  useEffect(()=>{
    axios.get()
  })
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
    <section className="col-md-9">
    <div className="card">
      <h5 className="card-header">My Courses</h5>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Enrolled</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>English Language</td>
              <td>
                <Link to="/">10</Link>
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
