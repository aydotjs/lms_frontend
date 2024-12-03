import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import MessageList from "./MessageList";
import Back from "../landing-page/common/back/Back";
const baseUrl = "https://Ambesten.pythonanywhere.com/api";

export default function MyTeachers() {
    // Retrieve student and teacher IDs from local storage
    const studentId = localStorage.getItem("studentId");
    const teacherId = localStorage.getItem("teacherId");

    // State for storing teacher data and message data
    const [teacherData, setTeacherData] = useState([]);
    const [msgData, setMsgData] = useState({ msg_text: "" });
    const [groupMsgData, setGroupMsgData] = useState({ msg_text: "" });

    // State for displaying success/error messages for individual and group messages
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [groupSuccessMsg, setGroupSuccessMsg] = useState("");
    const [groupErrorMsg, setGroupErrorMsg] = useState("");

    // Fetch teacher list on component mount
    useEffect(() => {
        try {
            const fullUrl = `${baseUrl}/fetch-my-teachers/${studentId}`;
            console.log("Fetching from: ", fullUrl); // Log the URL

            axios.get(fullUrl).then((res) => {
                console.log("Response: ", res.data); // Log the response
                setTeacherData(res.data);
            });
        } catch (error) {
            console.log("Error: ", error); // Log any fetch error
        }
    }, [studentId]);

    // Handle changes to individual message input
    const handleChange = (event) => {
        setMsgData({
            ...msgData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle submission of individual messages
    const formSubmit = (teacher_id) => {
        const _formData = new FormData();
        _formData.append("msg_text", msgData.msg_text);
        _formData.append("msg_from", "student");

        try {
            axios.post(`${baseUrl}/send-message/${teacher_id}/${studentId}/`, _formData)
                .then((res) => {
                    if (res.data.bool) {
                        setMsgData({ msg_text: "" });
                        setSuccessMsg(res.data.msg);
                        setErrorMsg("");
                    } else {
                        setSuccessMsg("");
                        setErrorMsg(res.data.msg);
                    }
                });
        } catch (error) {
            console.log("Error sending message:", error);
        }
    };

    // Handle changes to group message input
    const groupHandleChange = (event) => {
        setGroupMsgData({
            ...groupMsgData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle submission of group messages
    const groupFormSubmit = () => {
        const _formData = new FormData();
        _formData.append("msg_text", groupMsgData.msg_text);
        _formData.append("msg_from", "teacher");

        try {
            axios.post(`${baseUrl}/send-group-message/${teacherId}/`, _formData)
                .then((res) => {
                    if (res.data.bool) {
                        setGroupMsgData({ msg_text: "" });
                        setGroupSuccessMsg(res.data.msg);
                        setGroupErrorMsg("");
                    } else {
                        setGroupSuccessMsg("");
                        setGroupErrorMsg(res.data.msg);
                    }
                });
        } catch (error) {
            console.log("Error sending group message:", error);
        }
    };

    return (
        <div className="container mt-4">
            <Back/>
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <section className="col-md-9">
                    <div className="card">
                        {/* Header with "Send Message" button for group messages */}
                        <h5 className="card-header">
                            My Teachers
                            <button
                                type="button"
                                className="btn btn-primary float-end btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#groupMsgModal"
                            >
                                Send Message
                            </button>
                        </h5>

                        {/* Group Message Modal */}
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
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Display success or error message for group message */}
                                        {groupSuccessMsg && <p className="text-success">{groupSuccessMsg}</p>}
                                        {groupErrorMsg && <p className="text-danger">{groupErrorMsg}</p>}

                                        {/* Group Message Form */}
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label">Message</label>
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

                        {/* Teacher List Table */}
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map through teacherData to display each teacher and message button */}
                                    {teacherData.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Link to={`/teacher-detail/${row.teacher.id}`}>
                                                    {row.teacher.full_name}
                                                </Link>
                                            </td>
                                            <td>
                                                {/* Individual Message Modal Button */}
                                                <button
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#msgModal${index}`}
                                                    className="btn btn-sm btn-dark mb-2"
                                                    title="Send Message"
                                                >
                                                    <i className="bi bi-chat-fill"></i>
                                                </button>

                                                {/* Individual Message Modal */}
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
                                                                    <span className="text-danger">{row.teacher.full_name}</span>
                                                                </h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="row">
                                                                    {/* Message List Component */}
                                                                    <div className="col-md-7 mb-2 col-12 border-end">
                                                                        <MessageList teacher_id={row.teacher.id} student_id={studentId} />
                                                                    </div>

                                                                    {/* Individual Message Form */}
                                                                    <div className="col-md-4 col-12">
                                                                        {successMsg && <p className="text-success">{successMsg}</p>}
                                                                        {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                                                        <form>
                                                                            <div className="mb-3">
                                                                                <label className="form-label">Message</label>
                                                                                <textarea
                                                                                    onChange={handleChange}
                                                                                    value={msgData.msg_text}
                                                                                    name="msg_text"
                                                                                    className="form-control"
                                                                                    rows="5"
                                                                                ></textarea>
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => formSubmit(row.teacher.id)}
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
