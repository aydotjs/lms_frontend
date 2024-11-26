import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Back from "../landing-page/common/back/Back";
const baseUrl = "http://127.0.0.1:8000/api";  // Base URL for API

function Login() {
  // State to manage form data and error message
  const [studentLoginData, setStudentLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // Handle input field changes and update state
  const handleChange = (event) => {
    setStudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,  // Dynamically update the state based on the input field
    });
  };

  // Handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();  // Prevent form from refreshing the page

    const studentFormData = new FormData();
    studentFormData.append("email", studentLoginData.email);
    studentFormData.append("password", studentLoginData.password);

    try {
      const res = await axios.post(baseUrl + "/student-login", studentFormData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Necessary for FormData submission
        },
      });

      if (res.data.bool === true) {
        // Set login status and redirect to dashboard on successful login
        localStorage.setItem("studentLoginStatus", true);
        localStorage.setItem("studentId", res.data.student_id);
        window.location.href = "/student-dashboard";  // Redirect to student dashboard
      } else {
        // Show error message if login fails
        setErrorMsg("Oops!🙇 It looks like your email or password is incorrect. Please try again.");
      }
    } catch (error) {
      // Catch any errors and show a generic error message
      setErrorMsg("Oops! It looks like your email or password is incorrect. Please try again.");
    }
  };

  // Check if student is already logged in
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus === "true") {
    window.location.href = "/student-dashboard";  // Redirect if already logged in
  }

  // Set page title on component mount
  useEffect(() => {
    document.title = "Student Login";
  }, []);

  return (
    <div className="container mt-4">
      <Back />
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <div className="card-header">
              <h5>Student Login</h5>
            </div>
            <div className="card-body">
              {/* Display error message if it exists */}
              {errorMsg && <p className="text-danger">{errorMsg}</p>}

              {/* Login form */}
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input
                    type="email"
                    value={studentLoginData.email}
                    name="email"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input
                    type="password"
                    value={studentLoginData.password}
                    name="password"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                  />
                </div>
                {/* Form submit button */}
                <button
                  type="submit"
                  onClick={handleSubmitForm}
                  className="btn btn-primary"
                >
                  Login
                </button>
              </form>

              {/* Registration Link */}
              <div className="mt-3">
                <p>
                  Don't have an account?{" "}
                  <Link to="/student-register" className="text-primary">
                    Click here to register
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

export default Login;
