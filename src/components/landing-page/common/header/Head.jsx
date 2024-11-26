import React from "react";
import "./Head.css"; // For global styles
import styles from '../../style.module.css'; // For CSS Module styles

const Head = () => {
  return (
    <>
      <section className="head">
        <div className={`${styles.container} ${styles.flexSB}`}>
          <div className="logo">
            <h1>
              AMBESTEN
              <br />
              <span className="academy">
                <span className="lines"></span>
                <span className="lines"></span>
                ACADEMY
                <span className="lines"></span>
                <span className="lines"></span>
              </span>
            </h1>
            <span>ONLINE TUTOR FOR ALL LANGUAGES</span>
          </div>

          <div className="social">
            <i className={`fab fa-facebook-f icon ${styles.icon}`}></i>
            <i className={`fab fa-instagram icon ${styles.icon}`}></i>
            <i className={`fab fa-twitter icon ${styles.icon}`}></i>
            <i className={`fab fa-youtube icon ${styles.icon}`}></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
