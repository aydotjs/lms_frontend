import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import Swal from "sweetalert2";

// Base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api";

export default function EditChapter() {
  // State to store chapter data
  const [chapterData, setChapterData] = useState({
    course: "",
    title: "",
    description: "",
    prev_video: "",
    video: "",
    remarks: "",
  });

  // Retrieve the chapter_id from the URL parameters
  const { chapter_id } = useParams();

  // Handle text field changes (e.g., title, description, remarks)
  const handleChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle file input change (video upload)
  const handleFileChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0], // Store the file object
    });
  };

  // Submit form data to update the chapter
  const formSubmit = async () => {
    const _formData = new FormData();
    _formData.append("course", chapterData.course);
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    if (chapterData.video !== "") {
      // Only append the video if it's selected
      _formData.append("video", chapterData.video, chapterData.video.name);
    }
    _formData.append("remarks", chapterData.remarks);

    // Debugging: Log form data
    for (let pair of _formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      // Send PUT request to update the chapter
      const res = await axios.put(`${baseUrl}/chapter/${chapter_id}/`, _formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success notification
      if (res.status === 200) {
        Swal.fire({
          title: "Chapter updated successfully",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      // Handle errors in the update process
      console.error(
        "Error updating chapter:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Fetch existing chapter data when the component mounts
  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/chapter/${chapter_id}/`);
        // Populate the form fields with the fetched data
        setChapterData({
          course: res.data.course,
          title: res.data.title,
          description: res.data.description,
          prev_video: res.data.video, // Set the previously uploaded video
          remarks: res.data.remarks,
          video: "", // Keep video empty to allow for file upload
        });
      } catch (error) {
        // Handle errors in fetching data
        console.error(
          "Error fetching chapter data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchChapterData(); // Call the function
  }, [chapter_id]); // Dependency array to trigger the effect when chapter_id changes

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Update Chapter</h5>
            <div className="card-body">
              {/* Form for updating chapter */}
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent form from refreshing the page
                  formSubmit(); // Call form submission function
                }}
              >
                {/* Chapter title input */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={chapterData.title}
                    onChange={handleChange}
                  />
                </div>

                {/* Chapter description input */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    value={chapterData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Chapter video upload */}
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
                  {/* Display previously uploaded video if available */}
                  {chapterData.prev_video && (
                    <video controls width="100%" className="mt-2">
                      <source src={chapterData.prev_video} type="video/webm" />
                      <source src={chapterData.prev_video} type="video/mp4" />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  )}
                </div>

                {/* Chapter remarks input */}
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    className="form-control"
                    value={chapterData.remarks}
                    placeholder="This video focuses on basic introduction..."
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
