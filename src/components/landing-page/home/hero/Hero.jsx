import React from "react";
import Heading from "../../common/heading/Heading";
import "./Hero.css";
import styles from "../../style.module.css"; // For CSS Module styles
const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className={`${styles.container}`}>
          <div className={`${styles.row} row`}>
            <>
              <div id="heading">
                <h3 className="hi" style={{ letterSpacing: "1px", fontWeight: 600 }}>
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
            <p className="habit" style={{color : "#1eb2a6", fontWeight : 600}}>
              Make language learning a habit. Set aside time each day for
              practice. 5 minutes daily could become a lot
            </p>
            <div className="button" style={{ display : "flex"}}>
              <button className={styles['primary-btn'] } >
                GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
              </button>
              <button>
                VIEW COURSE <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className={`${styles.margin} margin`}></div>
    </>
  );
};

export default Hero;
