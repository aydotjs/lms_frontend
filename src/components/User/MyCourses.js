import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api"
export default function MyCourses() {
  const [courseData, setCourseData] = useState([]);
  const studentId =  localStorage.getItem("studentId")
    // fetch courses when page load
    useEffect(() => {
      try {
        axios.get(baseUrl + "/fetch-enrolled-courses/" + studentId).then((res) => {
          setStudentData(res.data);
        });
      } catch (error) {
        console.log(error);
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
            <tr>
              <td>English Language</td>
              <td>
                <Link to="/">Ayobami Owoeye</Link>
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
