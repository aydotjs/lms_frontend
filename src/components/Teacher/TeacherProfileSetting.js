import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherProfileSetting() {
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    profile_img: "",
    p_img: "", // This is used for file input (profile image upload)
  });

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    // Fetch Current Teacher Data
    const fetchCurrentTeacherData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/teacher/${teacherId}/`);
        setTeacherData({
          full_name: res.data.full_name,
          email: res.data.email,
          qualification: res.data.qualification,
          mobile_no: res.data.mobile_no,
          skills: res.data.skills,
          profile_img: res.data.profile_image, // This should match the API's response
          p_img: "", // Leave empty initially, as this is only for uploading
        });
      } catch (error) {
        console.error(
          "Error fetching teacher data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCurrentTeacherData();
  }, []);

  // Handle input changes for text fields
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle file input change for profile image
  const handleFileChange = (event) => {
    setTeacherData({
      ...teacherData,
      p_img: event.target.files[0], // Store the file object
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);

    if (teacherData.p_img) {
      teacherFormData.append(
        "profile_img",
        teacherData.p_img,
        teacherData.p_img.name
      );
    }

    axios
      .put(`${baseUrl}/teacher/${teacherId}/`, teacherFormData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Data has been updated",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setTeacherData({ status: "error" });
      });
  };

  useEffect(() => {
    document.title = "Teacher Profile";
  });

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus !== "true") {
    window.location.href = "/teacher-login";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Setting</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label htmlFor="full_name" className="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    value={teacherData.full_name}
                    onChange={handleChange}
                    name="full_name"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={teacherData.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="profile_img"
                  className="col-sm-2 col-form-label"
                >
                  Profile Image
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="p_img"
                    id="profile_img"
                    className="form-control"
                  />
                  {teacherData.profile_img && (
                    <p className="mt-2">
                      <img
                        src={`${baseUrl}${teacherData.profile_img}`} // Ensure the full URL is used here
                        width="300"
                        alt={teacherData.full_name}
                      />
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="skills" className="col-sm-2 col-form-label">
                  Skills
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="skills"
                    value={teacherData.skills}
                    onChange={handleChange}
                    name="skills"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="qualification"
                  className="col-sm-2 col-form-label"
                >
                  Qualification
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="qualification"
                    value={teacherData.qualification}
                    name="qualification"
                    onChange={handleChange}
                  ></textarea>
                  <div id="emailHelp" className="form-text">
                    BSc | MSc
                  </div>
                </div>
              </div>

              <hr />
              <button onClick={handleSubmit} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherProfileSetting;
