import React from "react";
import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

export default function EnrolledStudents() {
  const [studentData, setStudentData] = useState([]);
 let {course_id} =  useParams()

  // fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/fetch-enrolled-students/" + course_id).then((res) => {
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
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Enrolled Students List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => {
                    return (
                      <tr>
                        <td>
                          <Link to={`/view-student/${row.student.id}`}>
                            {row.student.full_name}
                          </Link>
                        </td>

                        <td>
                          {row.student.email}
                        </td>
                        <td>
                          {row.student.username}
                        </td>
                        <td>
                          <Link
                            className="btn btn-info btn-sm"
                            to={"/view-student/" + row.student.id}
                          >
                           View
                          </Link>
                        
                        
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
