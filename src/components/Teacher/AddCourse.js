import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";
export default function AddCourse() {
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    languages: "",
    featured_img: "",
  });

  useEffect(() => {
    try {
      axios.get(baseUrl + "/category").then((res) => {
        setCats(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0], // Store the file object
    });
  };

 const formSubmit = async () => {
  const teacherId = localStorage.getItem("teacherId");
  const formData = new FormData();
  formData.append("category", courseData.category);
  formData.append("teacher", teacherId);
  formData.append("title", courseData.title);
  formData.append("description", courseData.description);
  formData.append("featured_img", courseData.featured_img, courseData.featured_img.name);
  formData.append("languages", courseData.languages);

  try {
    const res = await axios.post(baseUrl + "/course/", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    window.location.href = "/add-course";
  } catch (error) {
    console.log("Error message:", error.response?.data || error.message);
  }
};


  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Upload a course</h5>
            <div className="card-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Categories
                </label>
                <select
                  onChange={handleChange}
                  name="category"
                  className="form-control"
                >
                  {cats.map((category, index) => (
                    <option key={index} value={category.id}>{category.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Language
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="title"
                  id="title"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  id="description"
                  name="description"
                  className="form-control"
                ></textarea>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Course Video
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="video"
                  name="featured_img"
                  className="form-control"
                />
              </div>

              <button className="btn btn-primary" onClick={formSubmit}>
                Upload
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
