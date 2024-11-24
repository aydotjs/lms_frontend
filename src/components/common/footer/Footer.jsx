import React from "react";
import { blog } from "../../../dummydata";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className="newletter">
        <div className="container flexSB">
          <div className="left row">
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>
              Join our community of language enthusiasts and learners worldwide
            </span>
          </div>
          <div className="right row input-container">
            <div className="input-with-icon">
              <input type="text" placeholder="Enter email address" />
              <i className="fa fa-paper-plane"></i>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container padding">
          <div className="box logo">
            <h1>AMBESTEN ACADEMY</h1>
            <span>EXCELLENCE IN LANGUAGE EDUCATION</span>
            <p>
              Discover the joy of learning languages and connect with cultures
              around the world at Ambesten Academy.
            </p>

            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-instagram icon"></i>
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
              <div className="items flexSB">
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
                Ambesten Academy, 123 Language Lane, London, United Kingdom
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +44 1234 567890
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
        <p>Copyright ©2022 All rights reserved | Ambesten Academy</p>
      </div>
    </>
  );
};

export default Footer;
