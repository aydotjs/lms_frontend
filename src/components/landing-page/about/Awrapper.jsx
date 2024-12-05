import React from "react";
import { awrapper } from "../dummydata";
import styles from "../style.module.css"
const Awrapper = () => {
  return (
    <>
      <section className="awrapper">
        <div className={`${styles.container} ${styles.grid}`} style={{border : "2px solid red"}}>
          {awrapper.map((val) => {
            return (
              <div className={`box ${styles.flex}`}>
                <div className="img">
                  <img src={val.cover} alt="" />
                </div>
                <div className="text">
                  <h1 style={{ fontSize: "1.7rem"}}>{val.data}</h1>
                  <h3 style={{ fontSize: "1.7rem" }}>{val.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Awrapper;
