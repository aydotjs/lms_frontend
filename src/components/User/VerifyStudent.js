import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "../landing-page/common/back/Back";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// API base URL
const baseUrl = "https://Ambesten.pythonanywhere.com/api";
// const baseUrl = "http://127.0.0.1:8000/api";
function VerifyStudent() {
    const [studentData, setStudentData] = useState({
        otp_digit: '',
    });

    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    }
    const { student_id } = useParams()

    const submitForm = () => {
        const studentFormData = new FormData();
        studentFormData.append("otp_digit", studentData.otp_digit)
        try {
            axios.post(baseUrl + '/verify-student/' + student_id + "/", studentFormData)
                .then((res) => {
                    if (res.data.bool === true) {
                        localStorage.setItem('studentLoginStatus', "true");
                        localStorage.setItem('studentId', res.data.student_id);
                        window.location.href = '/student-dashboard';
                    } else {
                        seterrorMsg(res.data.msg);
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

    useEffect(() => {
        document.title = "Verify Student"
    })
    return (
        <div className="container mt-4">
            <Back />
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter 6 Digit OTP</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    OTP
                                </label>
                                <input
                                    type="number"
                                    value={studentData.otp_digit}
                                    name="otp_digit"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={submitForm}
                                className="btn btn-primary"
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default VerifyStudent;
