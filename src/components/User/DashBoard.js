import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Back from '../landing-page/common/back/Back';

// Base URL for the API
const baseUrl = 'http://127.0.0.1:8000/api/';

function Dashboard() {
  // State for storing dashboard data and student data
  const [dashboardData, setDashboardData] = useState({});
  const [studentData, setStudentData] = useState({});
  
  // Retrieve studentId from localStorage
  const studentId = localStorage.getItem('studentId');

  // Fetch data on component mount using useEffect
  useEffect(() => {
    // Function to fetch dashboard data for the student
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${baseUrl}student/dashboard/${studentId}`);
        setDashboardData(response.data);  // Set fetched data to state
      } catch (error) {
        console.error(error);  // Log error in console for debugging
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch dashboard data',
        });  // Show error notification
      }
    };

    // Function to fetch student profile data
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${baseUrl}student/${studentId}`);
        setStudentData(response.data);  // Set fetched data to state
      } catch (error) {
        console.error(error);  // Log error in console for debugging
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to get student data',
        });  // Show error notification
      }
    };

    // Call the functions to fetch data
    fetchDashboardData();
    fetchStudentData();
  }, [studentId]);  // Dependency array ensures the effect runs only when studentId changes

  return (
    <div className="container mt-4">
      <Back/>
      <div className="row">
        {/* Sidebar section */}
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        {/* Main content section */}
        <div className="col-md-9">
          {/* Welcome message displaying student's first name if available */}
          <h2 className="mb-4">
            Welcome, {studentData.full_name ? studentData.full_name.split(" ")[0] : 'Student'}
          </h2>

          {/* Dashboard cards displaying student metrics */}
          <div className="row">
            {/* Enrolled Courses card */}
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">Enrolled Courses</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/my-courses">
                      {dashboardData.enrolled_courses || 0}  {/* Display number of enrolled courses */}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Completed Assignments card */}
            <div className="col-md-4">
              <div className="card border-success">
                <h5 className="card-header bg-success text-white">Completed Assignments</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/my-assignments">
                      {dashboardData.complete_assignments || 0}  {/* Display number of completed assignments */}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Pending Assignments card */}
            <div className="col-md-4">
              <div className="card border-danger">
                <h5 className="card-header bg-danger text-white">Pending Assignments</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/my-assignments">
                      {dashboardData.pending_assignments || 0}  {/* Display number of pending assignments */}
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
