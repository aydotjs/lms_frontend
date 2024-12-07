import React from "react";
import "./courses.css";
import { online } from "../dummydata";
import Heading from "../common/heading/Heading";
import styles from "../style.module.css";
const OnlineCourses = () => {
  return (
    <>
      <section className="online">
        <div className={`${styles.container}`}>
          {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
          <>
            <div id="heading">
              <h3 style={{fontSize : "24px", fontWeight : "bold"}} >Courses </h3>
              <h1  style={{fontSize : "2rem", fontWeight : "bold"}}>Browse Our Online Courses </h1>
            </div>
          </>
          <div
            className={`content ${styles.grid3}`}
           
          >
            {online.map((val) => (
              <div className="box">
                <div className="img">
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt="" className="show" />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineCourses;
