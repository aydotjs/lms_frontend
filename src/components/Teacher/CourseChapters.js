import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api"; // Ensure this matches your backend URL

export default function CourseChapters() {
  const [chapterData, setChapterData] = useState([]);
  const { course_id } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Validate course_id
    if (!course_id) {
      setErrorMsg("No course ID provided.");
      console.error("No course_id found in URL parameters.");
      return;
    }

    const url = `${baseUrl}/course-chapters/${course_id}`;
    console.log('Fetching URL:', url);

    axios.get(url)
      .then((res) => {
        console.log('Response Data:', res.data);
        if (res.data && res.data.length > 0) {
          setChapterData(res.data);
        } else {
          setErrorMsg("No chapters found for this course.");
        }
      })
      .catch((error) => {
        console.error('Error fetching course chapters:', error);
        if (error.response) {
          // Server responded with a status other than 2xx
          if (error.response.status === 404) {
            setErrorMsg("Course chapters not found.");
          } else if (error.response.status === 401) {
            setErrorMsg("Unauthorized access. Please log in.");
          } else {
            setErrorMsg("An unexpected error occurred.");
          }
        } else if (error.request) {
          // Request was made but no response received
          setErrorMsg("No response from the server. Please try again later.");
        } else {
          // Something else happened
          setErrorMsg("Error: " + error.message);
        }
      });
  }, [course_id]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Chapters</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              {chapterData.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Video</th>
                      <th>Remarks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapterData.map((chapter, index) => (
                      <tr key={index}>
                        <td>
                          <Link to="#">{chapter.title}</Link>
                        </td>
                        <td>
                          {chapter.video_url ? (
                            <video controls width="250">
                            <source src="{chapter.video.url}" type="video/webm" />
                            <source src="{chapter.video.url}" type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                        
                          ) : (
                            "No Video"
                          )}
                        </td>
                        <td>{chapter.remarks}</td>
                        <td>
                          <button className="btn btn-danger">Delete</button>
                          <button className="btn btn-info ms-1">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                !errorMsg && <p>Loading chapters...</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
