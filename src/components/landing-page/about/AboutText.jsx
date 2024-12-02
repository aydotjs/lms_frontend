import React from "react";
import { Link } from "react-router-dom";

const AboutText = () => {
  return (
    <div className="container">
      <div className="text-center mb-4">
        <p className="lead">
          Welcome to <strong>Am Besten Academy</strong>. At Am Besten Academy, we believe
          language is the key to endless opportunities.
        </p>
      </div>

      <div className="mb-5 text-center">
        <h2 className="fw-semibold">Our Mission</h2>
        <p>
          To empower people from diverse backgrounds to achieve their goals through 
          language learning in a supportive, inclusive community.
        </p>
      </div>

      <div className="mb-5 text-center">
        <h2 className="fw-semibold">Our Vision</h2>
        <p>
          To become a leading online platform known for innovation, teaching excellence, 
          and fostering global connections through language.
        </p>
      </div>

      <div className="mb-5 text-center">
        <h2 className="fw-semibold">Our Values</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Excellence:</strong> Delivering exceptional learning experiences.
          </li>
          <li className="list-group-item">
            <strong>Innovation:</strong> Using cutting-edge tools and methods.
          </li>
          <li className="list-group-item">
            <strong>Inclusivity:</strong> Making language learning accessible to everyone.
          </li>
          <li className="list-group-item">
            <strong>Community:</strong> Encouraging collaboration and interaction.
          </li>
        </ul>
      </div>

      <div className="mb-5 text-center">
        <h2 className="fw-semibold">Our Team</h2>
        <p>
          We are a global team of expert instructors and curriculum developers dedicated 
          to personalized support and success. Our flexible platform welcomes remote tutors, 
          enabling them to connect with students worldwide.
        </p>
      </div>

      <div className="text-center mb-3">
        <h2 className="fw-semibold">Join Us</h2>
        <p>
          Embark on a transformative journey to learn languages, broaden horizons, and unlock 
          new opportunities with <strong>Am Besten Academy</strong>. Explore our courses and 
          join our global community today!
        </p>
        <Link to="/course"><button className="btn btn-primary">Explore Courses</button></Link>
      </div>
    </div>
  );
};

export default AboutText;
