import React, { useState, useEffect } from "react"; // Combine similar imports
import { Link, useParams } from "react-router-dom"; // Import Link and useParams for routing
import axios from "axios"; // Import axios for HTTP requests

// Base URL for backend API
const baseUrl = "http://127.0.0.1:8000/api";

// TeacherDetail component to display teacher's details and their courses
export default function TeacherDetail() {
  // Get teacher_id from the URL parameters
  let { teacher_id } = useParams();

  // State to hold teacher data and their courses
  const [teacherData, setTeacherData] = useState({});
  const [courseData, setCourseData] = useState([]);

  // Fetch teacher details and courses from the backend when the component loads
  useEffect(() => {
    // Wrapping the API call in an async function for better error handling
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/teacher/${teacher_id}`);
        setTeacherData(response.data); // Set teacher data
        setCourseData(response.data.teacher_courses); // Set the list of courses
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };
    fetchData(); // Call the async function
  }, [teacher_id]); // Dependency array ensures this runs only when teacher_id changes

  return (
    <div className="container mt-3">
      {/* Display Teacher's Profile */}
      <div className="row">
        <div className="col-4">
          {/* Placeholder image for the teacher */}
          <img src="/logo512.png" className="img-thumbnail" alt="Teacher profile" />
        </div>
        <div className="col-8">
          {/* Teacher Name and Details */}
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.detail}</p>

          {/* Languages Taught by the Teacher */}
          <p className="fw-bold">
            Languages:{" "}
            <Link to="/category/beginner-friendly">English</Link>
            {", "}
            <Link to="/category/beginner-friendly">Spanish</Link>
          </p>

          {/* Display Teacher's Recent Course */}
          <p className="fw-bold">
            Recent Course: <Link to="/category/beginner-friendly">Spanish</Link>
          </p>

          {/* Static rating for now, ideally this should come from the backend */}
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>

      {/* Course List for the Teacher */}
      <div className="card mt-4">
        <div className="card-header">Course List</div>
        <div className="list-group list-group-flush">
          {/* Map over the courses and display each as a link */}
          {courseData.map((course) => (
            <Link
              key={course.id}
              to={`/detail/${course.id}`}
              className="list-group-item list-group-item-action"
            >
              {course.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
