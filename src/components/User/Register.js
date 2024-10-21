import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/student/";
function StudentRegister() {
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    password: "",
    username: "",
    interested_categories: "",
    status: "",
  });
  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit Form
  const handleSubmitForm = () => {
    const studentFormData = new FormData();

    // Append form data fields
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("password", studentData.password);
    studentFormData.append("username", studentData.username);
    studentFormData.append(
      "interested_categories",
      studentData.interested_categories
    );

    try {
      // POST request using axios
      axios.post(baseUrl, studentFormData).then((response) => {
        setStudentData({
          full_name: "",
          email: "",
          password: "",
          username: "",
          interest: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };
  useEffect(() => {
    document.title = "Student Register";
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {studentData.status === "success" && (
          <p className="text-success">Thanks for your registration</p>
        )}
        {studentData.status === "error" && (
          <p className="text-danger">Somwthing wrong happened</p>
        )}
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Register Now</h5>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label">
                  Full Name
                </label>
                <input
                  value={studentData.full_name}
                  type="text"
                  name="full_name"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  value={studentData.email}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  value={studentData.username}
                  type="text"
                  name="username"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  value={studentData.password}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="interest" className="form-label">
                  Interests
                </label>
                <textarea
                  value={studentData.interested_categories}
                  name="interested_categories"
                  onChange={handleChange}
                  className="form-control"
                  id="emailHelp"
                >
                  Pidgin, Akan, Yoruba
                </textarea>
              </div>

              <button
                type="submit"
                onClick={handleSubmitForm}
                className="btn btn-primary"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;
