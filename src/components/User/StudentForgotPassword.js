import React, { useState } from "react";
import axios from "axios";
import Back from "../landing-page/common/back/Back";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// API base URL
const baseUrl = "https://Ambesten.pythonanywhere.com/api";
// const baseUrl = "http://127.0.0.1:8000/api";
function StudentForgotPassword() {
    const navigate = useNavigate()
    // State to manage login form data
    const [studentData, setStudentData] = useState({
        email: "",

    });

    // State to store error message
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Update form data when input fields change
    const handleChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = () => {
        const studentFormData = new FormData();
        studentFormData.append('email', studentData.email)
        try {
            axios.post(baseUrl + '/student-forgot-password/', studentFormData)
                .then((res) => {
                    if (res.data.bool === true) {
                        setSuccessMsg(res.data.msg);
                    } else {
                        setErrorMsg(res.data.msg);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }


    // Redirect to dashboard if teacher is already logged in
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
        window.location.href = "/student-dashboard";
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter your registered email</h5>
                        <div className="card-body">
                            {successMsg && <p className="text-success">{successMsg}</p>}
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email"
                                    value={studentData.email}
                                    name="email"
                                    onChange={handleChange}
                                    className="form-control" />
                            </div>
                            <button type="submit"
                                onClick={submitForm}
                                className="btn btn-primary">Send</button>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default StudentForgotPassword;
