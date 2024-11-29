import React, { useEffect, useState } from "react";
import OnlineCourses from "../allcourses/OnlineCourses";
import styles from "../style.module.css";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

const HAbout = () => {
  const [courseData, setCourseData] = useState([]);

  // Fetch courses when page loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(baseUrl + "/course/?result=3");
        setCourseData(res.data); // Set fetched data to courseData
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="homeAbout">
      <div className={`${styles.container} container`}>
        <div id={`${styles.heading}`}>
          <h3>our courses</h3>
          <h1>explore our popular online courses</h1>
        </div>

        <div className="coursesCard">
          <div className={`${styles.grid2}`}>
            {courseData.map((course) => (
              <div key={course.id} className="items">
                <div className="content flex">
                  <div className="left">
                    <div className="img">
                      {/* Course Image */}
                      <img src={course.featured_img} alt={course.title} />
                    </div>
                  </div>
                  <div className="text">
                    {/* Course Title */}
                    <h1>{course.title}</h1>

                    {/* Course Rating */}
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <label htmlFor="">(5.0)</label>
                    </div>

                    {/* Teacher Details */}
                    <div className="details">
                      <div className="box">
                        <div className="dimg">
                          <img
                            src={course.teacher.profile_img || "default-img.jpg"} // Fallback for null profile_img
                            alt={course.teacher.full_name}
                          />
                        </div>
                        <div className="para">
                          <h4>{course.teacher.full_name}</h4>
                        </div>
                      </div>
                      <span>{course.languages}</span>
                    </div>
                  </div>
                </div>
                <div className="price">
                  <h3>${course.price || "Free"}</h3>
                </div>
                <button className="outline-btn">ENROLL NOW!</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <OnlineCourses />
    </section>
  );
};

export default HAbout;
