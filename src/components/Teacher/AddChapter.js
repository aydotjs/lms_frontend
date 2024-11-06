import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://127.0.0.1:8000/api";

export default function AddChapter() {
  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    video: null,
    remarks: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { course_id } = useParams();

  const handleChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setChapterData({
      ...chapterData,
      video: event.target.files[0],
    });
  };

  const formSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("title", chapterData.title);
    formData.append("description", chapterData.description);
    formData.append("video", chapterData.video, chapterData.video.name);
    formData.append("remarks", chapterData.remarks);

    const loadingToastId = toast.info("Uploading chapter, please wait...", { autoClose: false });

    try {
      const res = await axios.post(`${baseUrl}/chapter/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.update(loadingToastId, {
        render: "Chapter uploaded successfully!",
        type: "success",
        autoClose: 5000,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error submitting chapter:", error.response?.data || error.message);
      toast.update(loadingToastId, {
        render: "Error uploading chapter. Please try again.",
        type: "error",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="video" className="form-label">Video</label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">Remarks</label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    className="form-control"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={formSubmit}
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Uploading..." : "Upload Chapter"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
