import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
const siteUrl = "http://127.0.0.1:8000/";
function CourseDetail() {
  const [courseData, setCourseData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  let { course_id } = useParams();

  // Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + "/course/" + course_id).then((res) => {
        setCourseData(res.data);
        setChapterData(res.data.course_chapters);
        setTeacherData(res.data.teacher);
        setRelatedCourseData(JSON.parse(res.data.related_videos));
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(relatedCourseData);
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
            <Link to="/teacher-detail/1">{teacherData.full_name}</Link>
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">Total Enrolled: 456 Students</p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>
      {/* Course Detail */}
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
              {/* Video Modal Start */}
              <div
                className="modal fade"
                id="videoModal1"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Video 1
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={chapter.video}
                          title="Chapter Title"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Video Modal End */}
            </li>
          ))}
        </ul>
      </div>
      <h5 className="pb-1 mb-4 mt-5">Related Courses </h5>
      <div className="row mb-4">
        {relatedCourseData.map((rcourse, index) => (
          <div className="col-md-3">
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
