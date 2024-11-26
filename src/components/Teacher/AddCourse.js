import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Back from "../landing-page/common/back/Back";
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

  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(false);

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
      featured_img: event.target.files[0],
    }));
  };

  // Handle form submission to add a new course
  const formSubmit = async () => {
    setIsLoading(true); // Set loading state to true
    const teacherId = localStorage.getItem("teacherId");
    const formData = new FormData();
  
    // Append form data fields
    formData.append("category", courseData.category);
    formData.append("teacher", teacherId);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("languages", courseData.languages);
    formData.append("featured_img", courseData.featured_img, courseData.featured_img.name);
  
    // Show loading message
    const loadingToastId = toast.info("Uploading course, please wait...", {
      autoClose: false, // Keep toast visible until manually updated or dismissed
    });
  
    try {
      await axios.post(`${baseUrl}/course/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      
      // Update the toast to success message
      toast.update(loadingToastId, {
        render: "Course uploaded successfully!",
        type: "success",
        autoClose: 5000, // Closes after 5 seconds
      });
  
      // Redirect after successful upload
      window.location.href = "/add-course";
    } catch (error) {
      console.error("Error submitting course:", error.response?.data || error.message);
      // Update the toast to error message
      toast.update(loadingToastId, {
        render: "Error uploading course. Please try again.",
        type: "error",
        autoClose: 5000, // Closes after 5 seconds
      });
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };
  

  return (
    <div className="container mt-4">
      <Back/>
      <ToastContainer />
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Upload a Course</h5>
            <div className="card-body">
              
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

              <div className="mb-3">
                <label className="form-label fw-bold">Course Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="featured_img"
                  name="featured_img"
                  className="form-control"
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={formSubmit}
                disabled={isLoading} // Disable button if loading
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
