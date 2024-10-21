import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
function Login() {
  const [studentLoginData, setStudentLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setStudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append("email", studentLoginData.email);
    studentFormData.append("password", studentLoginData.password);

    try {
      const res = await axios.post(baseUrl + "/student-login", studentLoginData);
      if (res.data.bool === true) {
        localStorage.setItem("studentLoginStatus", true);
        localStorage.setItem("studentId", res.data.student_id);
        window.location.href = "/student-dashboard";
      } else {
        setErrorMsg("Oops!🙇 It looks like your email or password is incorrect. Please try again.");
  
      }
    } catch (error) {
      setErrorMsg("Oops! It looks like your email or password is incorrect. Please try again.");
     
    }
  };
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/studnet-dashboard";
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">User Login</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Username
                  </label>
                  <input type="email" className="form-control" />
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Remember me
                  </label>
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
