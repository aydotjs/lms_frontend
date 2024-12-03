import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import Back from "../landing-page/common/back/Back";
// Base URL for the API
const baseUrl = "https://Ambesten.pythonanywhere.com/api";

export default function EnrolledStudents() {
  // State to hold the list of enrolled students
  const [studentData, setStudentData] = useState([]);

  // Extract course ID from the route parameters
  let { course_id } = useParams();

  // Fetch enrolled students for the specified course when the component loads
  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/fetch-enrolled-students/${course_id}`);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      }
    };
    
    fetchEnrolledStudents();
  }, [course_id]); // Dependency array ensures this runs only when course_id changes

  return (
    <div className="container mt-4">
      <Back/>
      <div className="row">
        {/* Sidebar component for teacher navigation */}
       
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        {/* Main content area displaying enrolled students */}
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
                  {/* Map through the studentData array and render each student's info in a table row */}
                  {studentData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.email}</td>
                      <td>{row.student.username}</td>
                      <td>
                        {/* Link to view more details about the student */}
                        <Link className="btn btn-info btn-sm" to={`/view-student/${row.student.id}`}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
