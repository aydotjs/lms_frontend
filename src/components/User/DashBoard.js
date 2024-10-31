import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api/';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState({});
    const studentId = localStorage.getItem('studentId');

    useEffect(() => {
        // Fetch dashboard data
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${baseUrl}student/dashboard/${studentId}`);
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

        fetchDashboardData();
    }, [studentId]);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-primary text-white">Enrolled Courses</h5>
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
                            <div className="card border-info">
                                <h5 className="card-header bg-info text-white">Complete Assignments</h5>
                                <div className="card-body">
                                    <h3>
                                        <Link to="/teacher-courses">
                                            {dashboardData.total_teacher_chapters || 0}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-info">
                                <h5 className="card-header bg-info text-white">Pending Assignments</h5>
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

export default Dashboard;
