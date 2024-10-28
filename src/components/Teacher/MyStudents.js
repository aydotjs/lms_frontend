import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Removed useParams since it's not used
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

export default function MyStudents() {
  const [studentData, setStudentData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  // Fetch students when the page loads or teacherId changes
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${baseUrl}/fetch-all-enrolled-students/${teacherId}`);
        setStudentData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [teacherId]); // Added teacherId to dependency array

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All of my Students</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Assignment</th> {/* Fixed typo here */}
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => {
                    return (
                      <tr key={index}> {/* Added key prop */}
                        <td>{row.student.full_name}</td>
                        <td>{row.student.email}</td>
                        <td>{row.student.username}</td>
                        <td>
                          <Link className="btn btn-warning btn-sm" to={"#"}>
                            Assignment {/* Fixed typo here */}
                          </Link>
                          <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className="btn btn-success btn-sm ms-2">
                            Add Assignment {/* Fixed typo here */}
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
