import React from "react";
import "./Head.css";
const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <div className="logo">
            <h1 style={{ textAlign: "center" }}>
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
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-youtube icon"></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
