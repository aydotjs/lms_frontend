import { Link, useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Back from "../landing-page/common/back/Back";
// Base URL for the API
const baseUrl = "https://Ambesten.pythonanywhere.com/api";;

function ChangePassword() {
    // State to hold the new password input from the teacher
    const [teacherData, setTeacherData] = useState({
        password: ''
    });

    // Retrieve teacher ID from local storage
    const teacherId = localStorage.getItem('teacherId');

    // Handle input change to update state with the new password value
    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    };

    // Submit form to update the teacher's password
    const submitForm = async () => {
        const teacherFormData = new FormData();
        teacherFormData.append('password', teacherData.password);

        try {
            const response = await axios.post(`${baseUrl}/teacher/change-password/${teacherId}/`, teacherFormData);
            if (response.status === 200) {
                // Redirect to logout page if password change is successful
                window.location.href = '/teacher-logout';
            } else {
                alert('Oops... Some error occurred');
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setTeacherData({ status: 'error' });
        }
    };

    // Set page title when component mounts
    useEffect(() => {
        document.title = 'Teacher Change Password';
    }, []);

    // Check if teacher is logged in; if not, redirect to login page
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if (teacherLoginStatus !== 'true') {
        window.location.href = '/teacher-login';
    }

    return (
        <div className="container mt-4">
            <Back/>
            <div className="row">
                {/* Sidebar for teacher navigation */}
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                {/* Main content area for password change form */}
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                            {/* Password input field */}
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        name="password" 
                                        value={teacherData.password} 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        id="inputPassword" 
                                    />
                                </div>
                            </div>
                            <hr />
                            {/* Button to submit the form and update the password */}
                            <button className="btn btn-primary" onClick={submitForm}>Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ChangePassword;
