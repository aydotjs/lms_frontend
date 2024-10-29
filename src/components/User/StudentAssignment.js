import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
export default function Assignment() {
  const [assignmentData, setAssignmentData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  // fetch courses when page load
  useEffect(() => {
    try {
      const fullUrl = baseUrl + "/my-assignments/" + studentId;
      console.log("Fetching from: ", fullUrl); // Log the URL
      axios.get(fullUrl).then((res) => {
        console.log("Response: ", res.data); // Log the response
        setAssignmentData(res.data);
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
            <h5 className="card-header">My Assigments</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>

                  </tr>
                </thead>
                <tbody>
                  {assignmentData.length > 0 ? (
                    assignmentData.map((row, index) =>
                      row ? (
                        <tr key={index}>
                          <td><Link to={"/detail/" + row.id}>{row.title}</Link></td>
                          <td>
                            <Link to={"/teacher-detail/" + row.teacher.id}>{row.teacher?.full_name}</Link>
                          </td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td colSpan="3">No assignment available</td>
                        </tr>
                      )
                    )
                  ) : (
                    // If there are no assignments, display a single row saying "No assignment yet"
                    <tr>
                      <td colSpan="3">No assignment yet</td>
                    </tr>
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
