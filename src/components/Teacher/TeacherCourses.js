import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

export default function TeacherCourses() {
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  // Fetch courses when page loads
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(baseUrl + "/teacher-courses/" + teacherId);
      setCourseData(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const result = await Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        // Delete the course
        await axios.delete(`${baseUrl}/course/${courseId}/`);
        Swal.fire("Deleted!", "The course has been deleted.", "success");

        // Fetch updated list of courses
        fetchCourses();
      } catch (error) {
        Swal.fire("Error", "The course could not be deleted.", "error");
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={"/course-chapters/" + course.id}>
                          {course.title}
                        </Link>
                        <hr />
                        {course.course_rating ? (
                          <span>Rating: {course.course_rating}/5</span>
                        ) : (
                          <span>Rating: Not Rated</span>
                        )}
                      </td>
                      <td>
                        <img
                          src={course.featured_img}
                          width="80"
                          className="rounded"
                          alt={course.title}
                        />
                      </td>
                      <td>
                        <Link to={"/enrolled-students/" + course.id}>
                          {course.total_enrolled_students}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="btn btn-info btn-sm"
                          to={"/edit-course/" + course.id}
                        >
                          Edit
                        </Link>
                        <Link
                          className="btn btn-success btn-sm ms-2"
                          to={"/add-chapter/" + course.id}
                        >
                          Add Chapter
                        </Link>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
