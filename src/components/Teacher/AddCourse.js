import React from "react";
import TeacherSidebar from "./TeacherSidebar";
export default function AddCourse() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Upload a course</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label fw-bold">
                  Language
                </label>
                <input type="email" className="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label fw-bold">
                  Description
                </label>
                <textarea className="form-control"></textarea>
              </div>

              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label fw-bold">
                  Course Video
                </label>
                <input type="file" className="form-control" />
              </div>

              <hr />
              <button className="btn btn-primary">Upload</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
