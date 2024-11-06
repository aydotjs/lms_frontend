import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

// Base API URL
const baseUrl = "http://127.0.0.1:8000/api";

export default function EditCourse() {
  // State to store course categories
  const [cats, setCats] = useState([]);

  // Get the teacher ID from local storage (logged-in teacher)
  const teacherId = localStorage.getItem("teacherId");

  // State to store course data
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    languages: "",
    prev_image: "", // Store the previously uploaded image
    featured_img: "", // For the new image upload
  });

  // Retrieve course_id from URL parameters
  const { course_id } = useParams();

  // Fetch categories and course data when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${baseUrl}/category`);
        setCats(res.data); // Populate categories state
      } catch (error) {
        console.error("Error fetching categories:", error.response ? error.response.data : error.message);
      }
    };

    const fetchCourseData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/teacher-course-detail/${course_id}/`);
        // Set the fetched course data into state, especially setting category as its id
        setCourseData({
          category: res.data.category.id, // Only set the category id
          title: res.data.title,
          description: res.data.description,
          featured_img: "", // Initially empty for the file input
          prev_image: res.data.featured_image, // Store previous image URL for preview
          languages: res.data.languages,
        });
      } catch (error) {
        console.error("Error fetching course data:", error.response ? error.response.data : error.message);
      }
    };

    fetchCategories();
    fetchCourseData();
  }, [course_id]);
  // UseEffect to log courseData after it changes
  useEffect(() => {
    if (courseData) {
      console.log("Updated courseData:", courseData); // Logs when courseData is updated
    }
  }, [courseData]); // This useEffect will run whenever courseData changes

  // Handle input changes (for text fields and dropdown)
  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.name === "category" ? parseInt(event.target.value) : event.target.value,
    });
  };

  // Handle file input change (for image upload)
  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0], // Store the file object for upload
    });
  };

  // Handle form submission to update course data
  const formSubmit = () => {
    const formData = new FormData();
    formData.append("category", courseData.category);
    formData.append("teacher", teacherId);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);

    // Append the new image file only if it exists
    if (courseData.featured_img && typeof courseData.featured_img === 'object') {
      formData.append("featured_img", courseData.featured_img, courseData.featured_img.name);
    }

    formData.append("languages", courseData.languages);

    // Inspect the formData values
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:===>`, value);
    }

    try {
      // Send PUT request to update course data
      axios
        .put(baseUrl + "/teacher-course-detail/" + course_id + "/", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // Show success notification
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
        .catch((error) => {
          // Log any error responses from the server
          console.log("Error response:", error.response ? error.response.data : error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };


  // Render the edit course form
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Edit Course</h5>
            <div className="card-body">
              {/* Categories dropdown */}
              <div className="mb-3">
                <label htmlFor="category" className="form-label fw-bold">
                  Categories
                </label>
                <select
                  onChange={handleChange}
                  name="category"
                  className="form-control"
                  value={courseData.category}
                >
                  <option value="">Select Category</option>
                  {cats.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language input */}
              <div className="mb-3">
                <label htmlFor="languages" className="form-label fw-bold">
                  Language
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="languages"
                  id="languages"
                  className="form-control"
                  value={courseData.languages}
                />
              </div>

              {/* Description textarea */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">
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

              {/* Featured Image upload */}
              <div className="mb-3">
                <label htmlFor="featured_img" className="form-label fw-bold">
                  Course Image
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="featured_img"
                  name="featured_img"
                  className="form-control"
                />
                {/* Display previous image if it exists */}
                {courseData.prev_image && <img src={courseData.prev_image} alt="Course" />}
              </div>

              {/* Submit button */}
              <button className="btn btn-primary" onClick={formSubmit}>
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
