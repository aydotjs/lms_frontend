import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation between pages
import TeacherSidebar from "./TeacherSidebar"; // Teacher Sidebar component
import axios from "axios"; // Importing axios for making API requests
import MessageList from "./MessageList"; // Component to display the list of messages
import Swal from "sweetalert2"; // SweetAlert2 for displaying alerts

const baseUrl = "http://127.0.0.1:8000/api"; // Base URL for API calls

export default function MyStudents() {
  // State to hold the data of students enrolled with the teacher
  const [studentData, setStudentData] = useState([]);
  
  // Get teacherId from local storage
  const teacherId = localStorage.getItem("teacherId");

  // Fetch students data when the page loads or when teacherId changes
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // API call to fetch enrolled students
        const res = await axios.get(`${baseUrl}/fetch-all-enrolled-students/${teacherId}`);
        setStudentData(res.data); // Set student data to state
      } catch (error) {
        console.log(error); // Log error if the API call fails
      }
    };

    fetchStudents();
  }, [teacherId]); // Effect depends on teacherId

  // States for sending individual and group messages
  const [groupSuccessMsg, setGroupSuccessMsg] = useState(""); // For group message success feedback
  const [groupErrorMsg, setGroupErrorMsg] = useState(""); // For group message error feedback
  const [msgData, setMsgData] = useState({ msg_text: "" }); // State for individual message text
  const [groupMsgData, setGroupMsgData] = useState({ msg_text: "" }); // State for group message text
  const [successMsg, setSuccessMsg] = useState(""); // Success feedback for individual messages
  const [errorMsg, setErrorMsg] = useState(""); // Error feedback for individual messages

  // Handle change in individual message input
  const handleChange = (event) => {
    setMsgData({
      ...msgData,
      [event.target.name]: event.target.value, // Update message text dynamically
    });
  };

  // Submit individual message form
  const formSubmit = (student_id) => {
    const _formData = new FormData();
    _formData.append("msg_text", msgData.msg_text); // Message text
    _formData.append("msg_from", "teacher"); // Sender type

    try {
      axios
        .post(`${baseUrl}/send-message/${teacherId}/${student_id}/`, _formData) // API call to send message
        .then((res) => {
          if (res.data.bool === true) {
            setMsgData({ msg_text: "" }); // Clear message input after successful send
            setSuccessMsg(res.data.msg); // Set success feedback
            setErrorMsg(""); // Clear error feedback
          } else {
            setSuccessMsg(""); // Clear success feedback
            setErrorMsg(res.data.msg); // Set error feedback
          }
        });
    } catch (error) {
      console.log(error); // Log error in case of failure
    }
  };
  
  // Handle change in group message input
  const groupHandleChange = (event) => {
    setGroupMsgData({
      ...groupMsgData,
      [event.target.name]: event.target.value, // Update group message text dynamically
    });
  };

  // Submit group message form
  const groupFormSubmit = () => {
    const _formData = new FormData();
    _formData.append("msg_text", groupMsgData.msg_text); // Group message text
    _formData.append("msg_from", "teacher"); // Sender type

    try {
      axios
        .post(`${baseUrl}/send-group-message/${teacherId}/`, _formData) // API call to send group message
        .then((res) => {
          if (res.data.bool === true) {
            setGroupMsgData({ msg_text: "" }); // Clear group message input after successful send
            setGroupSuccessMsg(res.data.msg); // Set success feedback for group message
            setGroupErrorMsg(""); // Clear error feedback
          } else {
            setGroupSuccessMsg(""); // Clear success feedback
            setGroupErrorMsg(res.data.msg); // Set error feedback
          }
        });
    } catch (error) {
      console.log(error); // Log error in case of failure
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar component for teacher navigation */}
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        
        {/* Main content area */}
        <section className="col-md-9">
          <div className="card">
            {/* Header for the student list */}
            <h5 className="card-header">
              All of my Students
              {/* Button to open modal for sending a group message */}
              <button
                type="button"
                className="btn btn-primary float-end btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#groupMsgModal"
              >
                Send Message
              </button>
            </h5>

            {/* Modal for sending a group message */}
            <div
              className="modal fade"
              id="groupMsgModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Send message to All Students
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* Display success or error messages */}
                    {groupSuccessMsg && <p className="text-success">{groupSuccessMsg}</p>}
                    {groupErrorMsg && <p className="text-danger">{groupErrorMsg}</p>}
                    <form>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Message
                        </label>
                        <textarea
                          className="form-control"
                          name="msg_text"
                          rows="10"
                          onChange={groupHandleChange}
                          value={groupMsgData.msg_text}
                        ></textarea>
                      </div>
                      {/* Button to submit group message */}
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

            {/* Table to display student data */}
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
                  {/* Loop through student data and display each student */}
                  {studentData.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>{row.student.full_name}</td>
                        <td>{row.student.email}</td>
                        <td>{row.student.username}</td>
                        <td>
                          {/* Links for viewing and adding assignments */}
                          <Link
                            to={`/show-assignment/${row.student.id}/${teacherId}`}
                            className="btn btn-sm btn-warning mb-2 me-2"
                          >
                            Assignments
                          </Link>
                          <Link
                            to={`/add-assignment/${row.student.id}/${teacherId}`}
                            className="btn btn-sm btn-success mb-2 me-2"
                          >
                            Add Assignment
                          </Link>

                          {/* Button to open modal for sending individual message */}
                          <button
                            data-bs-toggle="modal"
                            data-bs-target={`#msgModal${index}`}
                            className="btn btn-sm btn-dark mb-2"
                            title="Send Message"
                          >
                            <i className="bi bi-chat-fill"></i>
                          </button>

                          {/* Modal for sending individual message */}
                          <div
                            className="modal fade"
                            id={`msgModal${index}`}
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-fullscreen">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">
                                    <span className="text-primary">
                                      Send Message to {row.student.full_name}
                                    </span>
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <div className="row">
                                    {/* Message list component for displaying chat history */}
                                    <div className="col-md-7 mb-2 col-12 border-end">
                                      <MessageList teacher_id={teacherId} student_id={row.student.id} />
                                    </div>
                                    <div className="col-md-4 col-12">
                                      {/* Display success or error messages */}
                                      {successMsg && <p className="text-success">{successMsg}</p>}
                                      {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                      <form>
                                        <div className="mb-3">
                                          <label htmlFor="exampleInputEmail1" className="form-label">
                                            Message
                                          </label>
                                          <textarea
                                            onChange={handleChange}
                                            value={msgData.msg_text}
                                            name="msg_text"
                                            className="form-control"
                                            rows="5"
                                          ></textarea>
                                        </div>
                                        {/* Button to submit individual message */}
                                        <button
                                          type="button"
                                          onClick={() => formSubmit(row.student.id)}
                                          className="btn btn-primary"
                                        >
                                          Submit
                                        </button>
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
