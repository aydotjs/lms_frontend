import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import Swal from "sweetalert2";

// Base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api";

// Component for displaying and managing chapters within a specific course
export default function CourseChapters() {
  // State variables for chapter data, total results count, and error messages
  const [chapterData, setChapterData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // Get the course_id from the URL parameters
  const { course_id } = useParams();

  // Fetch chapter data for the specific course on component load
  useEffect(() => {
    // Check if course_id is valid
    if (!course_id) {
      setErrorMsg("No course ID provided.");
      console.error("No course_id found in URL parameters.");
      return;
    }

    // Construct the API URL with the course_id
    const url = `${baseUrl}/course-chapters/${course_id}`;
    console.log("Fetching URL:", url);

    // API request to fetch course chapters
    axios
      .get(url)
      .then((res) => {
        console.log("API Response Data:", res.data); // Log the entire response data

        if (res.data && res.data.length > 0) {
          setChapterData(res.data);
          setTotalResult(res.data.length);
        } else {
          setErrorMsg("No chapters found for this course.");
        }
      })
      .catch((error) => {
        console.error("Error fetching course chapters:", error);

        // Error handling based on response status
        if (error.response) {
          if (error.response.status === 404) {
            setErrorMsg("Course chapters not found.");
          } else if (error.response.status === 401) {
            setErrorMsg("Unauthorized access. Please log in.");
          } else {
            setErrorMsg("An unexpected error occurred.");
          }
        } else if (error.request) {
          setErrorMsg("No response from the server. Please try again later.");
        } else {
          setErrorMsg("Error: " + error.message);
        }
      });
  }, [course_id]);

  // Handle delete action for a chapter with confirmation prompt
  const handleDeleteClick = async (chapter_id) => {
    const result = await Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to delete this chapter?',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton: true
    });

    if (result.isConfirmed) {
      try {
        // Send delete request to backend
        await axios.delete(`${baseUrl}/chapter/${chapter_id}/`);
        Swal.fire('success', 'This particular chapter has been deleted.');

        try {
          // Fetch updated list of course chapters
          const res = await axios.get(`${baseUrl}/course-chapters/${course_id}`);
          setTotalResult(res.data.length);
          setChapterData(res.data);
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        Swal.fire('error', 'Chapter has not been deleted!');
      }
    } else {
      Swal.fire('error', 'Chapter has not been deleted!');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar for teacher navigation */}
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>

        {/* Main content area displaying chapters */}
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              All Chapters ({totalResult})
              <Link className="btn btn-success float-end" to={`/add-chapter/${course_id}`}>Add Chapter</Link>
            </h5>
            <div className="card-body">
              {/* Display error message if present */}
              {errorMsg && <p className="text-danger">{errorMsg}</p>}

              {/* Chapter data table or "No chapters found" message */}
              {chapterData.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Video</th>
                      <th>Remarks</th>
                      <th style={{ width: '120px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapterData.map((chapter, index) => {
                      console.log("Inspecting chapter:", chapter);  // Log the chapter data for verification
                      console.log("Video URL found:", chapter.video);  // Log the video URL directly

                      return (
                        <tr key={index}>
                          <td><Link to="#">{chapter.title}</Link></td>
                          <td>
                            {chapter.video ? (
                              <video controls width="250">
                                <source src={chapter.video} type="video/webm" />
                                <source src={chapter.video} type="video/mp4" />
                                Sorry, your browser doesn't support embedded videos.
                              </video>
                            ) : (
                              "No Video"
                            )}
                          </td>
                          <td>{chapter.remarks}</td>
                          <td>
                            <Link to={`/edit-chapter/${chapter.id}`} className="btn btn-info">
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(chapter.id)}
                              className="btn btn-danger ms-1">
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>

                </table>
              ) : (
                !errorMsg && <p>No chapters found🙇</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
