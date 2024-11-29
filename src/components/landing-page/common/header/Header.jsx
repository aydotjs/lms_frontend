import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import styles from '../../style.module.css'; // For CSS Module styles

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <Head />
      <header>
        <nav className={`${styles.flexSB} flexSB`}>
          <ul 
            className={`${click ? "mobile-nav" : `flexSB ${styles.flexSB}`}`} 
            onClick={() => setClick(false)}
          >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/course'>All Courses</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/teacher-login'>Teacher</Link>
            </li>
            <li>
              <Link to='/student-login'>Students</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
          <div className={`${styles.start} start`}>
            <div className='button'><a href="https://forms.gle/iYS91a8V1odiQ3vC7" style={{color : "white"}}>APPLY AS A TEACHER</a></div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
