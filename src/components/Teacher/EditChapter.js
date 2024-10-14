import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

export default function EditChapter() {
  const [chapterData, setChapterData] = useState({
    course: "",
    title: "",
    description: "",
    prev_video: "",
    video: "",
    remarks: "",
  });
  const { chapter_id } = useParams();

  const handleChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0], // Store the file object
    });
  };

  const formSubmit = async () => {
    const _formData = new FormData();
    _formData.append("course", chapterData.course);
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    if (chapterData.video !== "") {
      _formData.append("video", chapterData.video, chapterData.video.name);
    }
    _formData.append("remarks", chapterData.remarks);
    for (let pair of _formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    try {
      const res = await axios.put(
        `${baseUrl}/chapter/${chapter_id}/`,
        _formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Display success toast notification here
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

      // console.log(res);
    } catch (error) {
      console.error(
        "Error updating chapter:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/chapter/${chapter_id}/`);
        setChapterData({
          course: res.data.course,
          title: res.data.title,
          description: res.data.description,
          prev_video: res.data.video,
          remarks: res.data.remarks,
          video: "",
        });

        // console.log(res.data);
      } catch (error) {
        console.error(
          "Error fetching chapter data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchChapterData();
  }, [chapter_id]);

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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formSubmit();
                }}
              >
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
                  {chapterData.video && (
                    <video controls width="100%" className="mt-2">
                      <source src={chapterData.prev_video} type="video/webm" />
                      <source src={chapterData.prev_video} type="video/mp4" />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    className="form-control"
                    value={chapterData.remarks}
                    placeholder="This video is focused on basic introduction..."
                    onChange={handleChange}
                  ></textarea>
                </div>
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
