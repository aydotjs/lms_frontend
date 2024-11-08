import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Removed useParams since it's not used
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import MessageList from "./MessageList";
import Swal from "sweetalert2";

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

  
  const [groupSuccessMsg, setGroupSuccessMsg] = useState("");
  const [groupErrorMsg, setGroupErrorMsg] = useState("");
  const [msgData, setMsgData] = useState({
    msg_text: "",
  });
  const [groupMsgData, setGroupMsgData] = useState({
    msg_text: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
 

  const handleChange = (event) => {
    setMsgData({
      ...msgData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (student_id) => {
    const _formData = new FormData();
    _formData.append("msg_text", msgData.msg_text);
    _formData.append("msg_from", "teacher");

    try {
      axios
        .post(`${baseUrl}/send-message/${teacherId}/${student_id}/`, _formData)
        .then((res) => {
          if (res.data.bool === true) {
            setMsgData({
              msg_text: ""
            });
            setSuccessMsg(res.data.msg);
            setErrorMsg("");
          } else {
            setSuccessMsg("");
            setErrorMsg(res.data.msg);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  const groupHandleChange = (event) => {
    setGroupMsgData({
      ...groupMsgData,
      [event.target.name]: event.target.value,
    });
  };

  // group form submit
  const groupFormSubmit = () => {
    const _formData = new FormData();
    _formData.append("msg_text", groupMsgData.msg_text);
    _formData.append("msg_from", "teacher");

    try {
      axios
        .post(`${baseUrl}/send-group-message/${teacherId}/`, _formData)
        .then((res) => {
          if (res.data.bool === true) {
            setGroupMsgData({
              msg_text: ""
            });
            setGroupSuccessMsg(res.data.msg);
            setGroupErrorMsg("");
          } else {
            setGroupSuccessMsg("");
            setGroupErrorMsg(res.data.msg);
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
            <h5 className="card-header">
              All of my Students
              <button type="button" className="btn btn-primary float-end btn-sm" data-bs-toggle="modal" data-bs-target="#groupMsgModal">
                Send Message
              </button>
            </h5>
            <div className="modal fade" id="groupMsgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Send message to All Students</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    {groupSuccessMsg && <p className="text-success">{groupSuccessMsg}</p>}
                    {groupErrorMsg && <p className="text-danger">{groupErrorMsg}</p>}
                    <form>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          name="msg_text"
                          rows="10"
                          onChange={groupHandleChange}
                          value={groupMsgData.msg_text}
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        onClick={groupFormSubmit}
                        className="btn btn-primary"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Assignment</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>{row.student.full_name}</td>
                        <td>{row.student.email}</td>
                        <td>{row.student.username}</td>
                        <td>
                          <Link to={`/show-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-warning mb-2 me-2">Assignments</Link>
                          <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-success mb-2 me-2">Add Assignment</Link>
                          <button data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} className="btn btn-sm btn-dark mb-2" title="Send Message">
                            <i className="bi bi-chat-fill"></i>
                          </button>
                          {/* Message Modal */}
                          <div className="modal fade" id={`msgModal${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-fullscreen">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">
                                    <span className="text-primary">Send Message to {row.student.full_name}</span>
                                  </h5>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <div className="row">
                                    <div className="col-md-7 mb-2 col-12 border-end">
                                      <MessageList teacher_id={teacherId} student_id={row.student.id} />
                                    </div>
                                    <div className="col-md-4 col-12">
                                      {successMsg && <p className="text-success">{successMsg}</p>}
                                      {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                      <form>
                                        <div className="mb-3">
                                          <label htmlFor="exampleInputEmail1" className="form-label">Message</label>
                                          <textarea onChange={handleChange} value={msgData.msg_text} name="msg_text" className="form-control" rows="5"></textarea>
                                        </div>
                                        <button type="button" onClick={() => formSubmit(row.student.id)} className="btn btn-primary">Submit</button>
                                      </form>
                                    </div>
                                  </div>
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
// 4