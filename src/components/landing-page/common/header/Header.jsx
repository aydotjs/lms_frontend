import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import styles from "../../style.module.css"; // For CSS Module styles

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <Head />
      <header>
        <nav className={`${styles.flexSB} flexSB`}>
          <ul className={`${click ? "mobile-nav" : `flexSB ${styles.flexSB}`}`}>
            <li>
              <Link to="/" onClick={() => setClick(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/course" onClick={() => setClick(false)}>
                All Courses
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setClick(false)}>
                About Us
              </Link>
            </li>
            <li>
              {/* <Link to="/teacher-register" onClick={() => setClick(false)}>
                Teacher
              </Link> */}
              <Link to="/teacher-login" onClick={() => setClick(false)}>
                Teacher
              </Link>
            </li>
            <li>
              <Link to="/student-login" onClick={() => setClick(false)}>
                Students
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setClick(false)}>
                Contact
              </Link>
            </li>
          </ul>
          <div className={`${styles.start} start`}>
            <div className="button">
              <a
                href="https://forms.gle/iYS91a8V1odiQ3vC7"
                style={{ color: "white" }}
              >
                APPLY AS A TEACHER
              </a>
            </div>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"> </i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;