import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

// Base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api";

// Component for adding a new chapter
export default function AddChapter() {
  // State to store chapter data
  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    video: "",
    remarks: "",
  });

  // Handle input change for text fields
  const handleChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle file input for video upload
  const handleFileChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0], // Store the file object
    });
  };

  // Get the course ID from the route parameters
  const { course_id } = useParams();

  // Form submission function to send data to API
  const formSubmit = () => {
    // Prepare form data to send to backend
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    _formData.append("video", chapterData.video, chapterData.video.name);
    _formData.append("remarks", chapterData.remarks);

    try {
      // Send POST request to backend API
      axios
        .post(baseUrl + "/chapter/", _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          // Show success message if the chapter is added successfully
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Data has been added",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error); // Log any errors to the console
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar for teacher navigation */}
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>

        {/* Main content area for adding a chapter */}
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>
            <div className="card-body">
              <form>
                {/* Title input field */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                {/* Description input field */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Video file input */}
                <div className="mb-3">
                  <label htmlFor="video" className="form-label">
                    Video
                  </label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>

                {/* Remarks input field */}
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    className="form-control"
                    placeholder="This video is focused on basic introduction..."
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={formSubmit}
                  className="btn btn-primary"
                >
                  Upload Chapter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
