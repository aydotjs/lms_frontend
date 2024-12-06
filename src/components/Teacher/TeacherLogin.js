import { useState } from "react";
import axios from "axios";
import Back from "../landing-page/common/back/Back";
import { Link } from "react-router-dom";
// API base URL

const baseUrl = "https://Ambesten.pythonanywhere.com/api";

function TeacherLogin() {
  // State to manage login form data
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });
  
  // State to store error message
  const [errorMsg, setErrorMsg] = useState("");

  // Update form data when input fields change
  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("email", teacherLoginData.email);
    teacherFormData.append("password", teacherLoginData.password);

    try {
      // Send login request to API
      const res = await axios.post(baseUrl + "/teacher-login", teacherFormData);

      // If login is successful
      if (res.data.bool === true) {
        // Store login status and teacher ID in localStorage
        localStorage.setItem("teacherLoginStatus", true);
        localStorage.setItem("teacherId", res.data.teacher_id);
        window.location.href = "/teacher-dashboard"; // Redirect to dashboard
      } else {
        setErrorMsg("Oops!🙇 It looks like your email or password is incorrect. Please try again.");
      }
    } catch (error) {
      // Show error message if login fails
      setErrorMsg("Oops! It looks like your email or password is incorrect. Please try again.");
    }
  };

  // Redirect to dashboard if teacher is already logged in
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/teacher-dashboard";
  }

  return (
    <div className="container mt-4">
    <Back />
    <div className="row">
      <div className="col-6 offset-3">
        <div className="card">
          <h5 className="card-header">Teacher Login</h5>
          <div className="card-body">
          <div className="alert alert-info" role="alert">
            Please note: You must apply and receive approval before logging in.
            If you haven't applied yet, <a href="https://forms.gle/iYS91a8V1odiQ3vC7" className="alert-link">click here to apply</a>.
          </div>
            {/* Display error message if any */}
            {errorMsg && <p className="text-danger">{errorMsg}</p>}

            <form onSubmit={handleSubmitForm}>
              {/* Email Input */}
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={teacherLoginData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={teacherLoginData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">Login</button>
            </form>

            {/* Registration Prompt */}
            <div className="mt-3 text-center">
              <p>
                Don’t have an account?{" "}
                <Link to="/teacher-register" className="text-primary">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default TeacherLogin;
