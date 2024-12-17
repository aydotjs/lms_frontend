import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "../landing-page/common/back/Back";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// API base URL
const baseUrl = "https://Ambesten.pythonanywhere.com/api";
// const baseUrl = "http://127.0.0.1:8000/api";
function VerifyTeacher() {
    const [teacherData, setteacherData] = useState({
        otp_digit: '',
    });

    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    }
    const { teacher_id } = useParams()

    const submitForm = () => {
        const teacherFormData = new FormData();
        teacherFormData.append("otp_digit", teacherData.otp_digit)
        try {
            axios.post(baseUrl + '/verify-teacher/' + teacher_id + "/", teacherFormData)
                .then((res) => {
                    if (res.data.bool === true) {
                        localStorage.setItem('teacherLoginStatus', true);
                        localStorage.setItem('teacherId', res.data.teacher_id);
                        window.location.href = '/teacher-dashboard';
                    } else {
                        seterrorMsg(res.data.msg);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }


    // Redirect to dashboard if teacher is already logged in
    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    if (teacherLoginStatus === "true") {
        window.location.href = "/teacher-dashboard";
    }

    useEffect(() => {
        document.title = "Verify teacher"
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
                                    value={teacherData.otp_digit}
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

export default VerifyTeacher;
