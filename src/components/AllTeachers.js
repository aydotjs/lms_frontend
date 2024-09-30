import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

export default function AllTeachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/teacher`)
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the teachers!", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="pb-1 mb-4 mt-5">All Our Teachers</h3>
      <div className="row mb-4">
        {teachers && teachers.length > 0 ? (
          teachers.map((teacher, index) => (
            <div className="col-md-3" key={index}>
              <div className="card">
                <Link to={`/teacher-detail/${teacher.id}`}>
                  <img src="logo512.png" className="card-img-top" alt={teacher.name} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/teacher-detail/${teacher.id}`}>{teacher.name}</Link>
                  </h5>
                </div>
                <div className="card-footer">
                  <div className="title">
                    <span>Rating: {teacher.rating || 'N/A'}/5</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No teachers available at the moment.</p>
        )}
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
