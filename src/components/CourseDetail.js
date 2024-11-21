import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
// Base URLs for API and site
const baseUrl = "http://127.0.0.1:8000/api";
const siteUrl = "http://127.0.0.1:8000/";
const stripePromise = loadStripe("pk_test_51QIxQ406TBZSzy23nCJqiBBHXoKyhbwtYCWJoib7ODwIlthRXp1mBrwrFxqRsYEyfSaESVJ7L4wBh28Z6ihaGZh000SDU73dBA");
function CourseDetail() {
  // State for various course-related data
  const [courseData, setCourseData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [userLoginStatus, setUserLoginStatus] = useState();
  const [enrollStatus, setEnrollStatus] = useState();
  const [ratingStatus, setRatingStatus] = useState();
  const [avgRating, setAvgRating] = useState(0);
  const [ratingData, setRatingData] = useState({ rating: "", reviews: "" });
  // Get course ID from URL params
  const { course_id } = useParams();

  // Effect hook to fetch course details, enroll status, rating status, and login status
  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    // Fetch course details
    axios
      .get(`${baseUrl}/course/${course_id}`)
      .then((res) => {
        setCourseData(res.data);
        setChapterData(res.data.course_chapters);
        setTeacherData(res.data.teacher);
        setRelatedCourseData(JSON.parse(res.data.related_videos));
        setAvgRating(res.data.course_rating || 0);
      })
      .catch((error) => console.log(error));

    // Fetch enroll status
    axios
      .get(`${baseUrl}/fetch-enroll-status/${studentId}/${course_id}`)
      .then((res) => {
        if (res.data.bool === true) setEnrollStatus("success");
      })
      .catch((error) => console.log(error));

    // Fetch rating status (similar to enroll status check)
    axios
      .get(`${baseUrl}/fetch-enroll-status/${studentId}/${course_id}`)
      .then((res) => {
        if (res.data.bool === true) setRatingStatus("success");
      })
      .catch((error) => console.log(error));

    // Check login status
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") setUserLoginStatus("success");
  }, [course_id]);

  // Handle input changes for the rating form
  const handleChange = (event) => {
    setRatingData({
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };

  // Enroll the student in the course
  // const enrollCourse = () => {
  //   const studentId = localStorage.getItem("studentId");
  //   const formData = new FormData();
  //   formData.append("course", course_id);
  //   formData.append("student", studentId);

  //   axios
  //     .post(`${baseUrl}/student-enroll-course/`, formData, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 200 || res.status === 201) {
  //         Swal.fire({
  //           title: "You have successfully enrolled in this course",
  //           icon: "success",
  //           toast: true,
  //           timer: 10000,
  //           position: "top-right",
  //           timerProgressBar: true,
  //           showConfirmButton: false,
  //         });
  //         setEnrollStatus("success");
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };
  const enrollCourse = () => {
    const studentId = localStorage.getItem("studentId");
    const formData = new FormData();
    formData.append("course_id", course_id);
    formData.append("student_id", studentId);

    // Call the backend to create a payment session
    axios
      .post(`${baseUrl}/create-payment-session/`, formData)
      .then((response) => {
        const sessionId = response.data.session_id;
        console.log(sessionId);
        alert("Session ID", sessionId)
        // Redirect to the Stripe Checkout page
        const stripe = window.Stripe("pk_test_51QKSM1HdbnsyluPYHhBKxcsFqFiylF9Hq05dzct8kXklrqmqihOInMNoDteV96ta1p9qcqGAJLsfKgQxyjFvWDGz00ncLG8PoZ");  // Add your public Stripe key here
        stripe.redirectToCheckout({ sessionId: sessionId });
      })
      .catch((error) => {
        console.log("Error creating payment session", error);
      });
  };


  // Submit the rating and review
  const formSubmit = () => {
    const studentId = localStorage.getItem("studentId");
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("student", studentId);
    formData.append("rating", ratingData.rating);
    formData.append("reviews", ratingData.reviews);

    axios
      .post(`${baseUrl}/course-rating/${course_id}`, formData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Rating has been saved",
            icon: "success",
            toast: true,
            timer: 5000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {/* Course Image and Overview */}
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

          <span className="fw-bold">Rating: {avgRating}/5</span>

          {/* Enroll and Rating Actions */}
          {enrollStatus === "success" && userLoginStatus === "success" && (
            <>
              {/* Show rating button if the user has not rated the course */}
              {ratingStatus !== "success" && (
                <button
                  className="btn btn-success btn-sm ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#ratingModal"
                >
                  Rating
                </button>
              )}
              {ratingStatus === "success" && (
                <small className="badge bg-info text-dark ms-2">
                  You already rated this course
                </small>
              )}
            </>
          )}

          {/* Modal for Rating */}
          <div
            className="modal fade"
            id="ratingModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Rate for {courseData.title}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="rating" className="form-label">
                        Rating
                      </label>
                      <select
                        onChange={handleChange}
                        className="form-control"
                        name="rating"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="reviews" className="form-label">
                        Review
                      </label>
                      <textarea
                        className="form-control"
                        name="reviews"
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      onClick={formSubmit}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment and Login State Management */}
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
                Enroll Now
              </button>
            </p>
          )}

          {/* Prompt for Login if the user is not logged in */}
          {userLoginStatus !== "success" && (
            <p>
              <Link to="/student-login">
                Please login to enroll in this course
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Course Chapters Section */}
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

      {/* Related Courses Section */}
      <h5 className="pb-1 mb-4 mt-5">Related Courses</h5>
      <div className="row mb-4">
        {relatedCourseData.map((rcourse, index) => (
          <div className="col-md-3" key={index}>
            <div className="card">
              <Link to={`/detail/${rcourse.pk}`}>
                <img
                  src={courseData.featured_img}
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



// // Mark as Favorite Course
// const markAsFavorite = () => {
//   const studentId = localStorage.getItem("studentId");
//   const formData = new FormData();

//   formData.append("course", course_id);
//   formData.append("student", studentId);
//   formData.append("status", true);

//   try {
//     axios
//       .post(`${baseUrl}/student-add-favorite-course/`, formData, {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         if (res.status === 200 || res.status === 201) {
//           Swal.fire({
//             title: "This course has been added to your wish list",
//             icon: "success",
//             toast: true,
//             timer: 10000,
//             position: "top-right",
//             timerProgressBar: true,
//             showConfirmButton: false,
//           });
//           setFavoriteStatus("success");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Remove from favorite course
// const removeFavorite = () => {
//   const studentId = localStorage.getItem("studentId");
//   try {
//     axios
//       .get(
//         `${baseUrl}/student-remove-favorite-course/${course_id}/${studentId}`
//       )
//       .then((res) => {
//         if (res.status === 200 || res.status === 201) {
//           Swal.fire({
//             title: "This course has been removed from your wish list",
//             icon: "success",
//             toast: true,
//             timer: 10000,
//             position: "top-right",
//             timerProgressBar: true,
//             showConfirmButton: false,
//           });
//           setFavoriteStatus("");
//         }
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };


{/* {userLoginStatus === "success" &&   favoriteStatus !== "success" &&(
          <p>
            <button
              onClick={markAsFavorite}
              type="button"
              className="btn btn-outline-danger"
              title="Add in your favourite course list"
            >
              <i className="bi bi-heart-fill"></i>
            </button>
          </p>
        )} */}
{/* {userLoginStatus === "success" &&   favoriteStatus === "success" &&(
          <p>
            <button
              onClick={removeFavorite}
              type="button"
              className="btn btn-danger"
              title="Remove from your favourite course list"
            >
              <i className="bi bi-heart-fill"></i>
            </button>
          </p>
        )} */}

// // Fetch favorite status
// try {
//   axios
//     .get(`${baseUrl}/fetch-favorite-status/${studentId}/${course_id}`)
//     .then((res) => {
//       if (res.data.bool === true) {
//         setFavoriteStatus("success");
//       } else {
//         setFavoriteStatus("");
//       }
//     });
// } catch (error) {
//   console.log(error);
// }
