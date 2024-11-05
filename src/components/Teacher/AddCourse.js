import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

export default function AddCourse() {
  // State to manage list of categories for the dropdown
  const [cats, setCats] = useState([]);

  // State to manage course data fields
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    languages: "",
    featured_img: null,
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/category`);
        setCats(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input change for text and select fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change specifically for the featured image
  const handleFileChange = (event) => {
    setCourseData((prevData) => ({
      ...prevData,
      featured_img: event.target.files[0], // Store the selected file object
    }));
  };

  // Handle form submission to add a new course
  const formSubmit = async () => {
    const teacherId = localStorage.getItem("teacherId"); // Retrieve teacher ID from local storage
    const formData = new FormData();

    // Append form data fields
    formData.append("category", courseData.category);
    formData.append("teacher", teacherId);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("languages", courseData.languages);
    formData.append("featured_img", courseData.featured_img, courseData.featured_img.name);

    try {
      // Submit course data to the API
      await axios.post(`${baseUrl}/course/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      window.location.href = "/add-course"; // Redirect after successful upload
    } catch (error) {
      console.error("Error submitting course:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar /> {/* Sidebar component for navigation */}
        </aside>
        
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Upload a Course</h5>
            <div className="card-body">
              
              {/* Category Dropdown */}
              <div className="mb-3">
                <label className="form-label fw-bold">Categories</label>
                <select
                  onChange={handleChange}
                  name="category"
                  className="form-control"
                  value={courseData.category}
                >
                  <option value="">Select Category</option>
                  {cats.map((category) => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                  ))}
                </select>
              </div>

              {/* Title Input */}
              <div className="mb-3">
                <label className="form-label fw-bold">Title</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="title"
                  id="title"
                  className="form-control"
                  value={courseData.title}
                />
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  onChange={handleChange}
                  id="description"
                  name="description"
                  className="form-control"
                  value={courseData.description}
                ></textarea>
              </div>

              {/* Language Input */}
              <div className="mb-3">
                <label className="form-label fw-bold">Language</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="languages"
                  id="languages"
                  className="form-control"
                  value={courseData.languages}
                />
              </div>

              {/* File Input for Course Video */}
              <div className="mb-3">
                <label className="form-label fw-bold">Course Video</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="featured_img"
                  name="featured_img"
                  className="form-control"
                />
              </div>

              {/* Submit Button */}
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
