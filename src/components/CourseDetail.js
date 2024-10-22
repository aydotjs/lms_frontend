import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";
const siteUrl = "http://127.0.0.1:8000/";

function CourseDetail() {
  const [courseData, setCourseData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const { course_id } = useParams(); // Corrected syntax
  const [userLoginStatus, setUserLoginStatus] = useState();
  const [enrollStatus, setEnrollStatus] = useState();

  useEffect(() => {
    const studentId = localStorage.getItem("studentId"); // Declare studentId here

    // Fetch course details when the page loads
    try {
      axios.get(`${baseUrl}/course/${course_id}`).then((res) => {
        setCourseData(res.data);
        setChapterData(res.data.course_chapters);
        setTeacherData(res.data.teacher);
        setRelatedCourseData(JSON.parse(res.data.related_videos));
      });
    } catch (error) {
      console.log(error);
    }

    // Fetch enroll status
    try {
      axios
        .get(`${baseUrl}/fetch-enroll-status/${studentId}/${course_id}`)
        .then((res) => {
          if (res.data.bool === true) {
            setEnrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    // Check login status
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
      setUserLoginStatus("success");
    }
  }, [course_id]);

  const enrollCourse = () => {
    const studentId = localStorage.getItem("studentId");
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("student", studentId);

    try {
      axios
        .post(`${baseUrl}/student-enroll-course/`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "You have successfully enrolled in this course",
              icon: "success",
              toast: true,
              timer: 10000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setEnrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_img}
            className="img-thumbnail"
            alt={courseData.title}
          />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:{" "}
            <Link to={`/teacher-detail/${teacherData.id}`}>
              {teacherData.full_name}
            </Link>
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">
            Total Enrolled: {courseData.total_enrolled_students} Student
            {courseData.total_enrolled_students > 1 ? "s" : ""}
          </p>

          <p className="fw-bold">Rating: 4.5/5</p>

          {enrollStatus === "success" && userLoginStatus === "success" && (
            <p>
              <span>You are already enrolled in this course</span>
            </p>
          )}

          {userLoginStatus === "success" && enrollStatus !== "success" && (
            <p>
              <button
                onClick={enrollCourse}
                type="button"
                className="btn btn-success"
              >
                Enroll in this course
              </button>
            </p>
          )}

          {userLoginStatus !== "success" && (
            <p>
              <Link to="/student-login">
                Please login to enroll in this course
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Course Detail */}
      {enrollStatus === "success" && userLoginStatus === "success" && (
        <div className="card mt-4">
          <div className="card-header">
            <h5>In this course</h5>
          </div>
          <ul className="list-group list-group-flush">
            {chapterData.map((chapter) => (
              <li className="list-group-item" key={chapter.id}>
                {chapter.title}
                <span className="float-end">
                  <span className="me-5">1 Hour 30 Minutes</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => window.open(chapter.video, "_blank")}
                  >
                    <i className="bi-youtube"></i>
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h5 className="pb-1 mb-4 mt-5">Related Courses </h5>
      <div className="row mb-4">
        {relatedCourseData.map((rcourse, index) => (
          <div className="col-md-3" key={index}>
            <div className="card">
              <Link to={`/detail/${rcourse.pk}`}>
                <img
                  src={`${siteUrl}/media/${rcourse.fields.featured_img}`}
                  className="card-img-top"
                  alt={rcourse.fields.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link target="__blank" to={`/detail/${rcourse.pk}`}>
                    {rcourse.fields.title}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
