import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
export default function EditCourse() {
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    languages: "",
    prev_image: "",
    featured_img: "",
  });
  const { course_id } = useParams();
  useEffect(() => {
    try {
      axios.get(baseUrl + "/category").then((res) => {
        setCats(res.data);
        // console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/teacher-course-detail/${course_id}/`
        );
        setCourseData({
          category: res.data.category,
          title: res.data.title,
          description: res.data.description,
          featured_image: "",
          prev_image: res.data.featured_image,
          languages: res.data.languages,
        });

        console.log("res data==>",res.data);
      } catch (error) {
        console.error(
          "Error fetching chapter data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCourseData();
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

  const formSubmit = () => {
    const formData = new FormData();
    formData.append("category", courseData.category);
    formData.append("teacher", 1);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
  
    // Check if featured_img is a file before appending
    if (courseData.featured_img && typeof courseData.featured_img === 'object') {
      formData.append(
        "featured_img",
        courseData.featured_img,
        courseData.featured_img.name
      );
    }
  
    formData.append("languages", courseData.languages);
  
    try {
      axios
        .put(baseUrl + "/teacher-course-detail/" + course_id + "/", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
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
    } catch (error) {
      console.log(error);
    }
  };
  
console.log(courseData);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Edit course</h5>
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
                  value={courseData.category}
                >
                  {cats.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.title}
                    </option>
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
                  name="languages"
                  id="title"
                  className="form-control"
                  value={courseData.languages}
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
                  value={courseData.description}
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
                {courseData.prev_image && <img src={courseData.prev_image}/>}
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
