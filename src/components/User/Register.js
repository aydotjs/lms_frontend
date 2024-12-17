import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Back from "../landing-page/common/back/Back";
// API base URL for student registration
// const baseUrl = "http://127.0.0.1:8000/api/student/";
const baseUrl = "https://Ambesten.pythonanywhere.com/api/student/";
export default function StudentRegister() {
  // State to manage form data and submission status
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    password: "",
    username: "",
    interested_categories: "",
    status: "",
    otp_digit: "",
  });

  // Handle form input changes to update state
  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmitForm = () => {
    const otp_digit = Math.floor(100000 + Math.random() * 900000);
    const studentFormData = new FormData();

    // Append form data to FormData object for submission
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("password", studentData.password);
    studentFormData.append("username", studentData.username);
    studentFormData.append("otp_digit", otp_digit);
    studentFormData.append(
      "interested_categories",
      studentData.interested_categories
    );

    try {
      // POST request to submit form data
      axios.post(baseUrl, studentFormData).then((response) => {
        // notification of succesfful registration
        toast.success("Thank you for registration, a one time password has been sent to your mail, enter the number to veriffy your account")
        window.location.href = "/verify-student/" + response.data.id;
        // Reset form after successful submission
        setStudentData({
          full_name: "",
          email: "",
          password: "",
          username: "",
          interested_categories: "",
          status: "success", // Update status to success
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
      // Update status to error on failure
      setStudentData({ status: "error" });
    }
  };

  // Set page title when component mounts
  useEffect(() => {
    document.title = "Student Register";
  }, []); // Empty array ensures this runs once when component is mounted

  return (
    <div className="container mt-4">
      <Back />
      <ToastContainer position="top-center" />
      <div className="row">
        {/* Display success or error message */}
        {studentData.status === "success" && (
          <p className="text-success">Thanks for your registration</p>
        )}
        {studentData.status === "error" && (
          <p className="text-danger">Something wrong happened</p>
        )}

        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Register Now</h5>
            <div className="card-body">
              {/* Full Name Field */}
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

              {/* Email Field */}
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

              {/* Username Field */}
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

              {/* Password Field */}
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

              {/* Interested Categories Field */}
              <div className="mb-3">
                <label htmlFor="interested_categories" className="form-label">
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

              {/* Submit Button */}
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


