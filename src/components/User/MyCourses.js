import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
export default function MyCourses() {
  const [courseData, setCourseData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  // fetch courses when page load
  useEffect(() => {
    try {
      const fullUrl = baseUrl + "/fetch-enrolled-courses/" + studentId;
      console.log("Fetching from: ", fullUrl); // Log the URL
      axios.get(fullUrl).then((res) => {
        console.log("Response: ", res.data); // Log the response
        setCourseData(res.data);
      });
    } catch (error) {
      console.log("Error: ", error); // Log the error if it occurs
    }
  }, []);

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
                    <th>Created By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((row, index) =>
                    // Check if row and row.course exist before rendering
                    row && row.course ? (
                      <tr key={index}>
                        <td><Link to={"/detail/"+row.course.id}>{row.course.title}</Link></td>
                        <td>
                          <Link to={"/teacher-detail/"+row.course.teacher.id}>{row.course.teacher?.full_name}</Link>
                          {/* Optional chaining for teacher */}
                        </td>
                        <td>
                          <button className="btn btn-danger btn-sm active">
                            Remove Enrollment
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={index}>
                        <td colSpan="3">Data is missing or incomplete</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
