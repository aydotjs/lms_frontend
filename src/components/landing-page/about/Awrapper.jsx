import React, { useState, useEffect } from "react";
import { awrapper } from "../dummydata";
import styles from "../style.module.css";

const Awrapper = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };

    // Set initial visibility based on window width
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <section className="awrapper">
        <div className={`${styles.container} ${styles.grid}`}>
          {awrapper.map((val, index) => {
            return (
              <div key={index} className={`box ${styles.flex}`}>
                <div className={`${styles.img}`}>
                  <img src={val.cover} alt="" />
                </div>
                <div className="text">
                  <h1 style={{ fontSize: "1.7rem", fontWeight: 600 }}>
                    {val.data}
                  </h1>
                  <h3 style={{ fontSize: "1.7rem", fontWeight: 600 }}>
                    {val.title}
                  </h3>
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
