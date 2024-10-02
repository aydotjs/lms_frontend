import { useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/";

function TeacherLogin() {
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("email", teacherLoginData.email);
    teacherFormData.append("password", teacherLoginData.password);

    try {
      axios.post(baseUrl + "/teacher-login", teacherFormData).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
// first commit
// second commit 
// third commit 
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Teacher Login</h5>
            <div className="card-body">
              <form onSubmit={handleSubmitForm}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email" // Added name attribute for state management
                    value={teacherLoginData.email} // Fixed typo: changed 'enail' to 'email'
                    onChange={handleChange}
                    className="form-control"
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
                    name="password" // Added name attribute for state management
                    value={teacherLoginData.password}
                    onChange={handleChange}
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

export default TeacherLogin;
