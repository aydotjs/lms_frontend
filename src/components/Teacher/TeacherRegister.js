import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define API base URL for teacher registration
const baseUrl = "http://127.0.0.1:8000/api/teacher/";

// TeacherRegister component
export default function TeacherRegister() {
  // State to hold form data and submission status
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    status: "",
  });

  // Handle form input changes
  const handleChange = (event) => {
    // Update specific input field in the state
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Prepare form data for submission
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);

    // Submit form data via axios
    try {
      axios.post(baseUrl, teacherFormData).then((response) => {
        // Display success toast notification
        toast.success("Thanks for your registration!");

        // Reset form data and set status to success upon successful submission
        setTeacherData({
          full_name: "",
          email: "",
          password: "",
          qualification: "",
          mobile_no: "",
          skills: "",
          status: "success",
        });
      });
    } catch (err) {
      console.log(err);
      // Display error toast notification
      toast.error("Something went wrong!");

      // Set status to error if submission fails
      setTeacherData({ status: "error" });
    }
  };

  // Set document title on component mount
  useEffect(() => {
    document.title = "Teacher Register";
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  // Redirect if already logged in as a teacher
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/teacher-dashboard";
  }

  // Render registration form
  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" />
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">As a Teacher, you can register here</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    className="form-control"
                    value={teacherData.full_name}
                  />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    onChange={handleChange}
                    name="email"
                    type="email"
                    className="form-control"
                    value={teacherData.email}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    value={teacherData.password}
                  />
                </div>

                {/* Qualification Field */}
                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">
                    Qualification
                  </label>
                  <input
                    id="qualification"
                    onChange={handleChange}
                    type="text"
                    name="qualification"
                    className="form-control"
                    value={teacherData.qualification}
                  />
                </div>

                {/* Mobile Number Field */}
                <div className="mb-3">
                  <label htmlFor="mobileNo" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    id="mobileNo"
                    onChange={handleChange}
                    type="number"
                    name="mobile_no"
                    className="form-control"
                    value={teacherData.mobile_no}
                  />
                </div>

                {/* Skills/Language Field */}
                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">
                    Language
                  </label>
                  <textarea
                    id="skills"
                    onChange={handleChange}
                    name="skills"
                    className="form-control"
                    value={teacherData.skills}
                  ></textarea>
                  <div id="emailHelp" className="form-text">
                    Igbo, Yoruba, Akan, etc.
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn btn-primary"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
