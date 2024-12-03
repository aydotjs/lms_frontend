import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const baseUrl = "https://Ambesten.pythonanywhere.com/api";

export default function AllTeachers() {
  const [teacher, setTeacher] = useState(null);
  useEffect(() => {
    axios.get(`${baseUrl}/teacher/`).then((response) => {
      setTeacher(response.data);
    });
  }, []);
  console.log(teacher);
  return (
    <div className="container mt-5">
      <h3 className="pb-1 mb-4 mt-5">All Our Teachers</h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Teacher Name</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Teacher Name</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Teacher Name</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Teacher Name</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Start */}
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
