import { Link } from "react-router-dom";
import AllCourses from "./AllCourses";
function Home() {
  return (
    <div className="container mt-4">
      {/* Latest Course */}
      <h3 className="pb-1 mb-4">
        Latest Courses{" "}
        <Link to="all-courses" className="float-end">
          See All
        </Link>
      </h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="/language-icons/english-language.png"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">English Language</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="/language-icons/german-flag.png"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">German Language</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="/language-icons/italy-flag.png"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Italian Language</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="/language-icons/spanish-language.png"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Spanish Language</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* End of latest course */}
      {/* Popular Courses */}
      <h3 className="pb-1 mb-4 mt-5">
        Popular Courses{" "}
        <Link to="/all-popular-courses" className="float-end">
          See All
        </Link>
      </h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="/language-icons/chinese-flag.png"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Chinese Language</a>
              </h5>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  <span className="float-end">Views: 78945</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="/language-icons/hindi.png"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Hindi Languge</a>
              </h5>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  <span className="float-end">Views: 78945</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="/language-icons/portugal.png"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Portuguese Language</a>
              </h5>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  <span className="float-end">Views: 78945</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="/language-icons/russia-flag.png"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Russia Language</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 78945</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Popular course */}
      {/* Featured Teachers */}
      <h3 className="pb-1 mb-4 mt-5">
        Our Teachers
        <Link to="/all-teachers" href="#" className="float-end">
          See All
        </Link>
      </h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1" href="#">
              <img
                src="/teacher-assets/teacher-with-laptop.png"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Ciroma Adekunle</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1" href="#">
              <img
                src="/teacher-assets/teacher-with-laptop.png"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Teacher 1</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1" href="#">
              <img
                src="/teacher-assets/teacher-with-laptop.png"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Teacher 2</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1" href="#">
              <img
                src="/teacher-assets/teacher-with-laptop.png"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">Teacher 3</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Featured Teachers course */}
      {/* Student Testimonials*/}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonials</h3>
      <div
        id="carouselExampleIndicators"
        className="carousel slide bg-dark text-white py-5"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <figure class="text-center">
              <blockquote class="blockquote">
                <p>
                  This app made learning Spanish easy and fun! The interactive
                  lessons on Language4All helped me gain confidence quickly, and
                  now I can hold basic conversations. Highly recommend it to
                  anyone wanting to learn a new language!"
                </p>
              </blockquote>
              <figcaption class="blockquote-footer">Dumebi A.</figcaption>
            </figure>
          </div>

          <div className="carousel-item">
            <figure class="text-center">
              <blockquote class="blockquote">
                <p>
                  Language4All is fantastic! I've been learning French, and the
                  lessons are both engaging and effective. I love how easy it is
                  to fit learning into my busy schedule. Highly recommend!
                </p>
              </blockquote>
              <figcaption class="blockquote-footer">
              Sarah K.
              </figcaption>
            </figure>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* End of Student Testimonials */}
    </div>
  );
}

export default Home;
