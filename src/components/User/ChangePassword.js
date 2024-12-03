import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';


const baseUrl = "https://Ambesten.pythonanywhere.com/api";;

function ChangePassword() {
    const [studentData, setStudentData] = useState({
        password: ''
    });
    
    const studentId = localStorage.getItem('studentId');

    const handleChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    };

    const submitForm = () => {
        const studentFormData = new FormData();
        studentFormData.append('password', studentData.password);

        try {
            axios.post(`${baseUrl}/student/change-password/${studentId}/`, studentFormData).then((response) => {
                if (response.status === 200) {
                    window.location.href = '/student-logout';
                } else {
                    alert('Oops... Some error occurred');
                }
            });
        } catch (error) {
            console.log(error);
            setStudentData({ 'status': 'error' });
        }
    };

    useEffect(() => {
        document.title = 'Student Change Password';
    }, []);

    const studentLoginStatus = localStorage.getItem('teacherLoginStatus');
    if (studentLoginStatus !== 'true') {
        window.location.href = '/student-login';
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                                <div className="col-sm-10">
                                    <input type="text" name="password" value={studentData.password} onChange={handleChange} className="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <hr />
                            <button className="btn btn-primary" onClick={submitForm}>Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ChangePassword;
