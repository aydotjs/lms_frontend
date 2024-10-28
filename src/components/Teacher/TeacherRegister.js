import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/teacher/";

function TeacherRegister() {
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

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);

    try {
      axios.post(baseUrl, teacherFormData).then((response) => {
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
      setTeacherData({ status: "error" });
    }
  };

  useEffect(() => {
    document.title = "Teacher Register";
  });
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus == "true") {
    window.location.href = "/teacher-dashboard";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {teacherData.status === "success" && (
          <p className="text-success">Thanks for your registration</p>
        )}
        {teacherData.status === "error" && (
          <p className="text-danger">Something went wrong!</p>
        )}
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">As a Teacher, you can register here</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                    value={teacherData.full_name} // Set value here
                  />
                </div>

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
                    value={teacherData.email} // Set value here
                  />
                </div>

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
                    value={teacherData.password} // Set value here
                  />
                </div>

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
                    value={teacherData.qualification} // Set value here
                  />
                </div>

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
                    value={teacherData.mobile_no} // Set value here
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">
                    Language
                  </label>
                  <textarea
                    id="skills"
                    onChange={handleChange}
                    name="skills"
                    className="form-control"
                    value={teacherData.skills} // Set value here
                  ></textarea>
                  <div id="emailHelp" className="form-text">
                    Igbo, Yoruba, Akan etc
                  </div>
                </div>

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

export default TeacherRegister;
