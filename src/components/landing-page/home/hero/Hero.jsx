import React from "react";
import Heading from "../../common/heading/Heading";
import "./Hero.css";
import styles from "../../style.module.css"; // For CSS Module styles
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className={`${styles.container}`}>
          <div className={`${styles.row} row`}>
            <>
              <div id="heading">
                <h3
                  className="hi"
                  style={{ letterSpacing: "1px", fontWeight: 600 }}
                >
                  WELCOME TO AMBESTEN
                </h3>
                <h1
                  style={{
                    fontSize: "45px",
                    margin: "20px 0",
                    textTransform: "capitalize",
                    fontWeight: 600,
                  }}
                >
                  Best Online Education Expertise
                </h1>
              </div>
            </>
            {/* <Heading subtitle='WELCOME TO AMBESTEN' title='Best Online Education Expertise' /> */}
            <p className="habit" style={{ color: "#fff", fontWeight: 600 }}>
              Make language learning a habit. Set aside time each day for
              practice. 5 minutes daily could become a lot
            </p>
            <div className="buttons">
              <Link
                to="/student-login"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#fff",
                  color: "#1eb2a6",
                  fontWeight: 600,
                  position: "relative",
                  zIndex: "20",
                  border: "none",
                  margin: "30px 10px 0 0",
                  borderRadius: "3px",
                  cursor: "pointer",
                  boxShadow: "0 24px 36px -11px rgba(0, 0, 0, 0.09)",
                  transition: "0.5s",
                }}
              >
                GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
              </Link>
              <Link
                to="/course"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#fff",
                  color: "#1eb2a6",
                  fontWeight: 600,
                  border: "none",
                  margin: "30px 10px 0 0",
                  borderRadius: "3px",
                  cursor: "pointer",
                  boxShadow: "0 24px 36px -11px rgba(0, 0, 0, 0.09)",
                  transition: "0.5s",
                }}
              >
                VIEW COURSE <i className="fa fa-long-arrow-alt-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className={`${styles.margin} margin`} style={{marginBottom : "24px"}}></div>
    </>
  );
};

export default Hero;
