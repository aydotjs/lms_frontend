import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function CourseDetail() {
  let { course_id } = useParams();

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="img-thumbnail" alt="..." />
        </div>
        <div className="col-8">
          <h3>Course Title</h3>
          <p>
            Using a combination of grid and utility classes, cards can be made
            horizontal in a mobile-friendly and responsive way. In the example
            below, we remove the grid gutters with .g-0 and use .col-md-*
            classes to make the card horizontal at the md breakpoint. Further
            adjustments may be needed depending on your card content.
          </p>
          <p className="fw-bold">
            Course By: <a href="#">Teacher 1</a>
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">Total Enrolled: 456 Students</p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>
      {/* Course Detail */}
      <div className="card mt-4">
        <div className="card-header">Course Videos</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Introduction
            <button className="btn btn-sm btn-secondary float-end btn-danger">
              <i className="bi-youtube"></i>
            </button>
          </li>
          <li className="list-group-item">
            Introduction
            <button className="btn btn-sm btn-secondary float-end btn-danger">
              <i className="bi-youtube"></i>
            </button>
          </li>
          <li className="list-group-item">
            Introduction
            <button className="btn btn-sm btn-secondary float-end btn-danger">
              <i className="bi-youtube"></i>
            </button>
          </li>
          <li className="list-group-item">
            Introduction
            <button className="btn btn-sm btn-secondary float-end btn-danger">
              <i className="bi-youtube"></i>
            </button>
          </li>
          <li className="list-group-item">Setup Project</li>
          <li className="list-group-item">Start with functional components</li>
        </ul>
      </div>
      <h5 className="pb-1 mb-4 mt-5">
        Related Courses{" "}
        
      </h5>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <Link to="/detail/1">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Course title</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="/logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
