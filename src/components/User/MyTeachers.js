import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
export default function MyTeachers() {
    const [teacherData, setTeacherData] = useState([]);
    const studentId = localStorage.getItem("studentId");
    // fetch courses when page load
    useEffect(() => {
        try {
            const fullUrl = baseUrl + "/fetch-my-teachers/" + studentId;
            console.log("Fetching from: ", fullUrl); // Log the URL
            axios.get(fullUrl).then((res) => {
                console.log("Response: ", res.data); // Log the response
                setTeacherData(res.data);
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
                        <h5 className="card-header">My Teachers</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>

                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teacherData.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Link to={`/teacher-detail/${row.teacher.id}`}>
                                                    {row.teacher.full_name}
                                                </Link>
                                            </td>
                                            <td>
                                                <i className="bi bi-chat-fill"></i>
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
