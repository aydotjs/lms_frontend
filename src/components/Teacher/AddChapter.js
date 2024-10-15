import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
const baseUrl = "http://127.0.0.1:8000/api";
export default function AddChapter() {
  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    video: "",
    remarks: "",
  });

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
  const { course_id } = useParams();
  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("title", chapterData.title);
    _formData.append("description", chapterData.description);
    _formData.append("video", chapterData.video, chapterData.video.name);
    _formData.append("remarks", chapterData.remarks);

    try {
      axios
        .post(baseUrl + "/chapter/" , _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log(res.data);
          window.location.href = "/add-chapter/1";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
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
                  <label for="title" className="form-label">
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
                <div className="mb-3">
                  <label for="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label for="video" className="form-label">
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
                <div className="mb-3">
                  <label for="techs" className="form-label">
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
                <button
                  type="button"
                  onClick={formSubmit}
                  className="btn btn-primary"
                >
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
