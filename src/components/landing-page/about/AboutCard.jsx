import React from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../dummydata";
import Awrapper from "./Awrapper";
import styles from "../style.module.css";

const AboutCard = () => {
  return (
    <>
      <section className="aboutHome">
        <div className={`${styles.container} ${styles.flexSB} flexSB container`}>
          <div className={`${styles["left"]} ${styles["row"]} left row`}>
            <img src="./images/about.webp" alt="" />
          </div>
          <div className={`${styles["right"]} ${styles["row"]} right row`}>
            {/* <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' /> */}
            <div id="heading">
              <h3 style={{color: "#1eb2a6", letterSpacing :"1px", fontWeight : 600}}>LEARN ANYTHING </h3>
              <h1 style={{fontWeight : 600, fontSize : "45px"}}>Benefits About Online Learning Expertise </h1>
            </div>
            <div className="items">
              {homeAbout.map((val) => {
                return (
                  <div className="item flexSB">
                    <div className="img">
                      <img src={val.cover} alt="" />
                    </div>
                    <div className="text">
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  );
};

export default AboutCard;
