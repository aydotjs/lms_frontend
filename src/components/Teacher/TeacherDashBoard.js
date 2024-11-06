import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api/';

function TeacherDashboard() {
    const [dashboardData, setDashboardData] = useState({});
    const [teacherData, setTeacherData] = useState({})
    const teacherId = localStorage.getItem('teacherId');
    console.log(teacherId);

    useEffect(() => {
        // Fetch dashboard data
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${baseUrl}teacher/dashboard/${teacherId}`);
                setDashboardData(response.data);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch dashboard data',
                });
            }
        };

        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`${baseUrl}teacher/${teacherId}`)
                setTeacherData(response.data)
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to get teacher  data',
                });
            }
        }
        fetchTeacherData()
        fetchDashboardData();
    }, [teacherId]);
    // Log teacherData to the console whenever it changes
    useEffect(() => {
        console.log("Teacher Data:", teacherData);
    }, [teacherData]);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-md-9">
                    {/* Welcome message with teacher's full name */}
                    <h2 className="mb-4">
                    Welcome, {teacherData.full_name ? teacherData.full_name.split(" ")[0] : 'Student'}
                    </h2>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-primary text-white">Total Courses</h5>
                                <div className="card-body">
                                    <h3>
                                        <Link to="/teacher-courses">
                                            {dashboardData.total_teacher_courses || 0}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-success">
                                <h5 className="card-header bg-success text-white">Total Students</h5>
                                <div className="card-body">
                                    <h3>
                                        <Link to="/my-students">
                                            {dashboardData.total_teacher_students || 0}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-info">
                                <h5 className="card-header bg-info text-white">Total Chapters</h5>
                                <div className="card-body">
                                    <h3>
                                        <Link to="/teacher-courses">
                                            {dashboardData.total_teacher_chapters || 0}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;
