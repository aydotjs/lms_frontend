import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Back from "../landing-page/common/back/Back";
// Base URL for the API
const baseUrl = 'http://127.0.0.1:8000/api/';

function TeacherDashboard() {
    // State to store dashboard and teacher data
    const [dashboardData, setDashboardData] = useState({});
    const [teacherData, setTeacherData] = useState({});
    const teacherId = localStorage.getItem('teacherId');

    // Fetch dashboard and teacher data when component loads
    useEffect(() => {
        // Function to fetch dashboard data
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${baseUrl}teacher/dashboard/${teacherId}`);
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch dashboard data',
                });
            }
        };

        // Function to fetch teacher profile data
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`${baseUrl}teacher/${teacherId}`);
                setTeacherData(response.data);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to get teacher data',
                });
            }
        };

        // Call data fetching functions
        fetchTeacherData();
        fetchDashboardData();
    }, [teacherId]);

    // Log teacherData to the console whenever it changes (for debugging purposes)
    useEffect(() => {
        console.log("Teacher Data:", teacherData);
    }, [teacherData]);

    return (
        <div className="container mt-4">
            <Back/>
            <div className="row">
                {/* Sidebar for teacher navigation */}
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                {/* Main content area */}
                <div className="col-md-9">
                    {/* Welcome message with teacher's first name */}
                    <h2 className="mb-4">
                        Welcome, {teacherData.full_name ? teacherData.full_name.split(" ")[0] : 'Teacher'}
                    </h2>

                    <div className="row">
                        {/* Total Courses card */}
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

                        {/* Total Students card */}
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

                        {/* Total Chapters card */}
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
