import { Link } from "react-router-dom"; // Importing necessary library
import TeacherSidebar from "./TeacherSidebar"; // Importing Sidebar component
import { useState, useEffect } from "react"; // Importing React hooks
import axios from "axios"; // Importing axios for API requests
import Swal from "sweetalert2"; // Importing SweetAlert2 for notifications
import Back from "../landing-page/common/back/Back";
//const baseUrl = "https://Ambesten.pythonanywhere.com/api"; // API base URL for the application
const baseUrl = "http://127.0.0.1:8000/api/teacher/";
function TeacherProfileSetting() {
  // State for storing teacher profile data and profile image
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    profile_img: "", // Current profile image URL from the server
    p_img: "", // For file input, to store new profile image
    login_via_otp : ""
  });

  // Get teacherId from local storage to fetch the teacher's data
  const teacherId = localStorage.getItem("teacherId");

  // Fetch teacher data on component mount
  useEffect(() => {
    const fetchCurrentTeacherData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/teacher/${teacherId}/`);
        setTeacherData({
          full_name: res.data.full_name || "",
          email: res.data.email || "",
          qualification: res.data.qualification || "",
          mobile_no: res.data.mobile_no || "",
          skills: res.data.skills || "",
          profile_img: res.data.profile_image || "", // API response for the image URL
          p_img: "", // Empty initially for file input
          login_via_otp : res.data.login_via_otp
        });
      } catch (error) {
        console.error("Error fetching teacher data:", error.response ? error.response.data : error.message);
      }
    };

    fetchCurrentTeacherData();
  }, []); // Empty dependency array ensures it runs only once when component mounts

  // Handle input field changes
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value, // Update specific field
    });
  };

  // Handle file input for profile image upload
  const handleFileChange = (event) => {
    setTeacherData({
      ...teacherData,
      p_img: event.target.files[0], // Store the file object when the user selects an image
    });
  };

  // Form submission handler for updating the teacher's profile data
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const teacherFormData = new FormData(); // Prepare FormData object for sending data
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);
    teacherFormData.append("login_via_otp", teacherData.login_via_otp);

    // Append profile image if a new one is selected
    if (teacherData.p_img) {
      teacherFormData.append("profile_img", teacherData.p_img, teacherData.p_img.name);
    }

    // Send a PUT request to update the teacher's profile data
    axios
      .put(`${baseUrl}/teacher/${teacherId}/`, teacherFormData, {
        headers: {
          "content-type": "multipart/form-data", // Indicate that we're sending form data
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Data has been updated", // Show a success alert
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setTeacherData({ status: "error" });
      });
  };

  // Check if the teacher is logged in, otherwise redirect to login page
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus !== "true") {
    window.location.href = "/teacher-login"; // Redirect to login page if not logged in
  }

  // Update document title on component mount
  useEffect(() => {
    document.title = "Teacher Profile"; // Set the page title
  }, []);

  return (
    <div className="container mt-4">
      <Back/>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar /> {/* Render the sidebar */}
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Setting</h5>
            <div className="card-body">
              {/* Full Name Input */}
              <div className="mb-3 row">
                <label htmlFor="full_name" className="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    value={teacherData.full_name || ""} // Ensure value is always controlled
                    onChange={handleChange}
                    name="full_name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={teacherData.email || ""} // Ensure value is always controlled
                    onChange={handleChange}
                    name="email"
                  />
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="mb-3 row">
                <label htmlFor="profile_img" className="col-sm-2 col-form-label">
                  Profile Image
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="p_img"
                    id="profile_img"
                    className="form-control"
                  />
                  {/* Display the current profile image if available */}
                  {teacherData.profile_img && (
                    <p className="mt-2">
                      <img
                        src={`${baseUrl}${teacherData.profile_img}`} // Use full URL for image
                        width="300"
                        alt={teacherData.full_name}
                      />
                    </p>
                  )}
                </div>
              </div>

              {/* Skills Input */}
              <div className="mb-3 row">
                <label htmlFor="skills" className="col-sm-2 col-form-label">
                  Skills
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="skills"
                    value={teacherData.skills || ""} // Ensure value is always controlled
                    onChange={handleChange}
                    name="skills"
                  />
                </div>
              </div>

              {/* Qualification Input */}
              <div className="mb-3 row">
                <label htmlFor="qualification" className="col-sm-2 col-form-label">
                  Qualification
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="qualification"
                    value={teacherData.qualification || ""} // Ensure value is always controlled
                    name="qualification"
                    onChange={handleChange}
                  ></textarea>
                  <div id="emailHelp" className="form-text">
                    BSc | MSc
                  </div>
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Login Via OTP
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={teacherData.login_via_otp || ""} // Ensure value is always controlled
                    onChange={handleChange}
                    name="login_via_otp"
                  />
                </div>
              </div>

              <hr />
              {/* Submit Button */}
              <button onClick={handleSubmit} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherProfileSetting;
