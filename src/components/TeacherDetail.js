import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

export default function TeacherDetail() {
  let { teacher_id } = useParams();
  const [teacherData, setTeacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  // Fetching data from backend
  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher/" + teacher_id).then((res) => {
        setCourseData(res.data.teacher_courses);
        setTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="img-thumbnail" alt="..." />
        </div>
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.detail}</p>
          <p className="fw-bold">
            Languages: <Link to="/category/beginner-friendly">English</Link>{" "}
            {", "}
            <Link to="/category/beginner-friendly">Spanish</Link>
          </p>
          <p className="fw-bold">
            Recent Course:
            <Link to="/category/beginner-friendly">Spanish</Link>
          </p>

          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>
      {/* Course Detail */}
      <div className="card mt-4">
        <div className="card-header">Course List</div>
        {
          <div className="list-group list-group-flush">
            {courseData.map((course, index) => (
              <Link
                to={`/detail/${course.id}`}
                className="list-group-item list-group-item-action"
              >
                {course.title}
              </Link>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
