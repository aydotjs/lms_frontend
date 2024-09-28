import React from "react";
import { Link } from "react-router-dom";

export default function TeacherDetail() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="img-thumbnail" alt="..." />
        </div>
        <div className="col-8">
          <h3>Ayobami Owoeye</h3>
          <p>
            Using a combination of grid and utility classes, cards can be made
            horizontal in a mobile-friendly and responsive way. In the example
            below, we remove the grid gutters with .g-0 and use .col-md-*
            classes to make the card horizontal at the md breakpoint. Further
            adjustments may be needed depending on your card content.
          </p>
          <p className="fw-bold">
            Languages: <Link to="/teacher-detail/1">English</Link>,{" "}
            <Link to="/teacher-detail/1">Arabic</Link>
          </p>
          <p className="fw-bold">
            Recent Course:
            <Link to="/teacher-detail/1">Arabic</Link>
          </p>

          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>
      {/* Course Detail */}
      <div className="card mt-4">
        <div className="card-header">Course List</div>
        <div className="list-group list-group-flush">
          <Link to="/detail/1" class="list-group-item list-group-item-action">
            English Course 1
          </Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">
            English Course 2
          </Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">
            French Course 1
          </Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">
            French Course 2
          </Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">
            Arabic Course 1
          </Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">
            Arabic Course 2
          </Link>
        </div>
      </div>
    </div>
  );
}
