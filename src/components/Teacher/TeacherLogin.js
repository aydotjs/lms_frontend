import { useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherLogin() {
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("email", teacherLoginData.email);
    teacherFormData.append("password", teacherLoginData.password);

    try {
      const res = await axios.post(baseUrl + "/teacher-login", teacherFormData);
      if (res.data.bool === true) {
        localStorage.setItem("teacherLoginStatus", true);
        localStorage.setItem("teacherId", res.data.teacher_id);
        window.location.href = "/teacher-dashboard";
      } else {
        setErrorMsg("Oops!🙇 It looks like your email or password is incorrect. Please try again.");
  
      }
    } catch (error) {
      setErrorMsg("Oops! It looks like your email or password is incorrect. Please try again.");
     
    }
  };

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/teacher-dashboard";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Teacher Login</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
             
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={teacherLoginData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
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

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmitForm}
                >
                  Login
                </button>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
