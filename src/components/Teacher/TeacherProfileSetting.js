import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
function TeacherProfileSetting() {
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    status: "",
    profile_img: "",
    p_img: "",
  });
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    // Fetch Current Teacher Data
    const fetchCurrentTeacherData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/teacher/${teacherId}/`);
        setTeacherData({
          full_name: res.data.full_name,
          email: res.data.description,
          qualification: res.data.qualification,
          mobile_no: res.data.mobile_no,
          skills: res.data.skills,
          featured_image: "",
          profile_img: res.data.profile_image,
          languages: res.data.languages,
        });

        console.log("res data==>", res.data);
      } catch (error) {
        console.error(
          "Error fetching chapter data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCurrentTeacherData();
  }, []);
  // Change Element value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.files[0], // Store the file object
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);

    if (teacherData.p_img !== "") {
      teacherFormData.append(
        "profile_img",
        teacherData.p_img,
        teacherData.p_img.name
      );
    }

    try {
      axios
        .put(`${baseUrl}/teacher/${teacherId}/`, teacherFormData,{
          headers: {
            "content-type": "multipart/form-data",
          },
        } )
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
        });
    } catch (err) {
      console.log(err);
      setTeacherData({ status: "error" });
    }
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
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="staticEmail"
                    value={teacherData.full_name}
                    onChange={handleChange}
                    name="full_name"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="staticEmail"
                    value={teacherData.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="video" className="col-sm-2 col-form-label">
                  Profile Image
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="p_img"
                    id="video"
                    className="form-control"
                  />
                  {teacherData.profile_img && (
                    <p className="mt-2">
                      <img
                        src={teacherData.profile_img}
                        width="300"
                        alt={teacherData.full_name}
                      />
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Languages
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="staticEmail"
                    value={teacherData.skills}
                    onChange={handleChange}
                    name="skills"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Qualification
                </label>
                <div class="col-sm-10">
                  <textarea
                    class="form-control"
                    value={teacherData.qualification}
                    name="qualification"
                    onChange={handleChange}
                  ></textarea>
                  <div id="emailHelp" class="form-text">
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
