import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Register() {
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    status: "",
  });

  // Change Element value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () =>{

  }

  useEffect(() => {
    document.title = "Teacher Register";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">As a Teacher, you can register here</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Qualification
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="qualification"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    onChange={handleChange}
                    type="number"
                    name="mobile_no"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Skills
                  </label>
                  <textarea
                    onChange={handleChange}
                    name="skills"
                    className="form-control"
                  ></textarea>
                  <div id="emailHelp" className="form-text">
                    Php, Python, Javascript, etc
                  </div>
                </div>

                <button onClick={handleSubmit} type="submit" className="btn btn-primary">
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

export default Register;
