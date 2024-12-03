import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Back from "../landing-page/common/back/Back";

// Define API base URL for teacher registration
const baseUrl = "https://Ambesten.pythonanywhere.com/api/teacher/";

// TeacherRegister component
export default function TeacherRegister() {
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    status: "",
  });

  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);

    try {
      axios.post(baseUrl, teacherFormData).then((response) => {
        toast.success("Thanks for your registration!, you can log in now");
        setTeacherData({
          full_name: "",
          email: "",
          password: "",
          qualification: "",
          mobile_no: "",
          skills: "",
          status: "success",
        });

        // Redirect to teacher login page after successful registration
        setTimeout(() => {
          window.location.href = "/teacher-login";
        }, 3000); // Add a slight delay for better UX
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      setTeacherData({ status: "error" });
    }
  };

  useEffect(() => {
    document.title = "Teacher Register";
  }, []);

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/teacher-dashboard";
  }

  return (
    <div className="container mt-4">
      <Back />
      <ToastContainer position="top-center" />
      <div className="row">
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
                    value={teacherData.full_name}
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
                    value={teacherData.email}
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
                    value={teacherData.password}
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
                    value={teacherData.qualification}
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
                    value={teacherData.mobile_no}
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
                    value={teacherData.skills}
                  ></textarea>
                  <div id="emailHelp" className="form-text">
                    Igbo, Yoruba, Akan, etc.
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
