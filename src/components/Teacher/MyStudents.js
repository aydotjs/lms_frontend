import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Removed useParams since it's not used
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
// testing
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
  const msgList = {
    height: "500px",
    overflow: "auto"
  }
  const [msgData, setMsgData] = useState({
    msg_text: "",

  });

  const handleChange = (event) => {
    setMsgData({
      ...msgData,
      [event.target.name]: event.target.value,
    });
  };
  const formSubmit = (student_id) => {
    const _formData = new FormData();
    _formData.append("teacher", teacherId);
    _formData.append("student", student_id);
    _formData.append("msg_text", msgData.msg_text);
    _formData.append("msg_from", student_id);


    try {
      axios
        .post(baseUrl + "/send-message/" + teacherId + "/" + student_id + "/", _formData)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log(res);
          }

        });
    } catch (error) {
      console.log(error);
    }
  };

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
                          <Link to={`/show-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-warning mb-2 me-2">Assignments</Link>
                          <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-success ms-2 mb-2 me-2">Add Assignment</Link>
                          <button data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} className="btn btn-sm btn-dark mb-2" title="Send Message">
                            <i class="bi bi-chat-fill"></i>
                          </button>

                          {/* Message Modal */}
                          <div class="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog  modal-dialog-scrollable modal-fullscreen">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">Send Message to <span className="text-danger">{row.student.full_name}</span>
                                    <span className="ms-5 btn btn-sm btn-secondary" title="Refresh"><i className="bi bi-bootstrap-reboot"></i></span></h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <div className="row">
                                    <div className="col-md-8 mb-2 col-12 border-end" style={msgList}>
                                      <div className="row">
                                        {/* From Another user */}
                                        <div className="col-5">
                                          <div className="alert alert-primary mb-1">
                                            A simple primary alert—check it out!
                                          </div>
                                          <small className="text-muted">22-07-2022 10:34</small>
                                        </div>
                                      </div>

                                      {/* My Messages */}
                                      <div className="row">
                                        {/* From Another user */}
                                        <div className="col-5 offset-7">
                                          <div className="alert alert-success mb-1">
                                            A simple primary alert—check it out!
                                          </div>
                                          <small className="text-muted">22-07-2022 10:34</small>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-4 col-12">
                                      <form>
                                        <div class="mb-3">
                                          <label for="exampleInputEmail1" class="form-label">Message</label>
                                          <textarea className='form-control' rows="10" onChange={handleChange}></textarea>
                                        </div>
                                        <button type="submit" onClick={() => formSubmit(row.student.id)} class="btn btn-primary">Submit</button>
                                      </form>

                                    </div>
                                  </div>

                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" class="btn btn-primary">Send</button>
                                </div>
                              </div>
                            </div>
                          </div>

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
