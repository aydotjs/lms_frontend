import React from "react";
import { blog } from "../../dummydata";
import "./footer.css";
import styles from "../../style.module.css"; // For CSS Module styles

const Footer = () => {
  return (
    <>
      <section className={`newletter`}>
        <div className={`${styles.flexSB} ${styles.container}`}>
          <div className="left row">
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>
              Join our community of language enthusiasts and learners worldwide
            </span>
          </div>
          <div className={`${styles.row} right`}>
            <input type="text" placeholder="Enter email address" />
            <i className="fa fa-paper-plane"></i>
          </div>
        </div>
      </section>
      <footer>
        <div className={`${styles.container}  container ${styles.padding}`}>
          <div className="box logo">
            <h1>AMBESTEN ACADEMY</h1>
            <span>EXCELLENCE IN LANGUAGE EDUCATION</span>
            <p>
              Discover the joy of learning languages and connect with cultures
              around the world at Ambesten Academy.
            </p>

            <i className={`${styles.icon} fab fa-facebook-f icon`}></i>
            <i className={`${styles.icon} fab fa-twitter icon`}></i>
            <i className={`${styles.icon} fab fa-instagram icon`}></i>
          </div>
          <div className="box link">
            <h3 className="fs-medium">Explore</h3>
            <ul>
              <li className="fs-small">About Us</li>
              <li className="fs-small">Services</li>
              <li className="fs-small">Courses</li>
              <li className="fs-small">Blog</li>
              <li className="fs-small">Contact us</li>
            </ul>
          </div>
          <div className="box link">
            <h3 className="fs-medium">Quick Links</h3>
            <ul>
              <li className="fs-small">Contact Us</li>
              <li className="fs-small">Pricing</li>
              <li className="fs-small">Terms & Conditions</li>
              <li className="fs-small">Privacy</li>
              <li className="fs-small">Feedbacks</li>
            </ul>
          </div>
          <div className="box">
            <h3 className="fs-medium">Recent Post</h3>
            {blog.slice(0, 3).map((val) => (
              <div className={`${styles.flexSB} items flexSB`} key={val.id}>
                <div className="img">
                  <img src={val.cover} alt="" />
                </div>
                <div className="text">
                  <span>
                    <i className="fa fa-calendar-alt"></i>
                    <label htmlFor="">{val.date}</label>
                  </span>
                  <span>
                    <i className="fa fa-user"></i>
                    <label htmlFor="">{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="box last">
            <h3 className="fs-medium">Have a Question?</h3>
            <ul>
              <li>
                <i className="fa fa-map"></i>
                1 Oliver Street Mexborough  Doncaster S64 9NW
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +447553544846,
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                ambestenacademy@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <p>Copyright ©2024 All rights reserved | Ambesten Academy</p>
      </div>
    </>
  );
};

export default Footer;
