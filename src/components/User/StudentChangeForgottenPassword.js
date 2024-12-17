import React, { useState } from "react";
import axios from "axios";
import Back from "../landing-page/common/back/Back";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
// API base URL
const baseUrl = "https://Ambesten.pythonanywhere.com/api";
// const baseUrl = "http://127.0.0.1:8000/api";
function StudentChangeForgottenPassword() {
    const navigate = useNavigate()
    // State to manage login form data
    const [studentData, setStudentData] = useState({
        password: "",

    });

    const {student_id} = useParams()
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
        studentFormData.append('password', studentData.password)
        try {
            axios.post(baseUrl + '/student-change-password/'+student_id+"/", studentFormData)
                .then((res) => {
                    if (res.data.bool === true) {
                        setSuccessMsg(res.data.msg);
                        setErrorMsg("");
                    } else {
                        setErrorMsg(res.data.msg);
                        setSuccessMsg("");
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
            <Back/>
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter your new password</h5>
                        <div className="card-body">
                            {successMsg && <p className="text-success">{successMsg}</p>}
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Password</label>
                                <input type="password"
                                    value={studentData.email}
                                    name="password"
                                    onChange={handleChange}
                                    className="form-control" />
                            </div>
                            <button type="submit"
                                onClick={submitForm}
                                className="btn btn-primary">Change Password</button>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default StudentChangeForgottenPassword;
