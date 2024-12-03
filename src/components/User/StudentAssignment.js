import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Back from "../landing-page/common/back/Back";
import Swal from "sweetalert2";
const baseUrl = "https://Ambesten.pythonanywhere.com/api";;
export default function Assignment() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState("");
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
// Mark as done
const markAsDone = (assignment_id, title, detail, student, teacher) => {
  const formData = new FormData();
  formData.append('student_status', true);
  formData.append('title', title);
  formData.append('detail', detail);
  formData.append('student', student);
  formData.append('teacher', teacher);

  try {
      axios.put(`${baseUrl}/update-assignment/${assignment_id}/`, formData, {
          headers: {
              'content-type': 'multipart/form-data'
          }
      })
      .then((res) => {
          if (res.status === 200 || res.status === 201) {
              window.location.reload();
          }
      });
  } catch (error) {
      console.log(error);
  }
};

  return (
    <div className="container mt-4">
      <Back/>
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
                    <th>Detail</th>
                    <th>Teacher</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentData.length > 0 ? (
                    assignmentData.map((row, index) =>
                      row ? (
                        <tr key={index}>
                          <td><Link to={"/detail/" + row.id}>{row.title}</Link></td>
                          <td>{row.detail}</td>
                          <td>
                            <Link to={"/teacher-detail/" + row.teacher.id}>{row.teacher?.full_name}</Link>
                          </td>
                          <td>
                            {row.student_status == false &&
                              <button onClick={() => markAsDone(row.id, row.title, row.detail, row.student.id, row.teacher.id)} className="btn btn-success btn-sm">Mark as Done</button>
                            }
                            {row.student_status == true &&
                              <span className="badge bg-primary">Completed</span>
                            }

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
