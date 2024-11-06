import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api/';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [studentData, setStudentData] = useState({})
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
    const fetchStudentdata = async () => {
      try {
        const response = await axios.get(`${baseUrl}student/${studentId}`)
        setStudentData(response.data)
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to get teacher  data',
        });
      }

    }
    fetchDashboardData();
    fetchStudentdata()
  }, [studentId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <div className="col-md-9">
          {/* Welcome message with student's full name */}
          <h2 className="mb-4">
            <h2 className="mb-4">
              Welcome, {studentData.full_name ? studentData.full_name.split(" ")[0] : 'Student'}
            </h2>

          </h2>

          <div className="row">
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">Enrolled Courses</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/my-courses">
                      {dashboardData.enrolled_courses || 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-success">
                <h5 className="card-header bg-success text-white">Complete Assignments</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/my-assignments">
                      {dashboardData.complete_assignments || 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-danger">
                <h5 className="card-header bg-danger text-white">Pending Assignments</h5>
                <div className="card-body">
                  <h3>
                    <Link to="/my-assignments">
                      {dashboardData.pending_assignments || 0}
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
