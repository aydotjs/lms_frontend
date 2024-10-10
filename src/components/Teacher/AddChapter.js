import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import { useState } from "react";
const baseUrl = "http://127.0.0.1:8000/api";
export default function AddChapter(){
 
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

  const formSubmit = () => {
    const formData = new FormData();
    formData.append("category", chapterData.category);
    formData.append("teacher", 1);
    formData.append("title", chapterData.title);
    formData.append("description", chapterData.description);
    formData.append("featured_img", chapterData.featured_img, chapterData.featured_img.name); // No need for courseData.f_img.name
    formData.append("languages", chapterData.languages);

    try {
      axios
        .post(baseUrl + "/course/", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          window.location.href = "/add-course";
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
                    <label for="title" className="form-label">Title</label>
                    <input type="text" id="title" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" onChange={handleChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label for="video" className="form-label">Video</label>
                    <input type="file" id="video" onChange={handleFileChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label for="techs" className="form-label">Remarks</label>
                    <input type="text" id="techs" className="form-control" placeholder="This video is focused on basic introduction..." />
                  </div>
                  <button type="button" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  