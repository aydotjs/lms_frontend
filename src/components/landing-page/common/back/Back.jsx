import React from "react";
import { useLocation } from "react-router-dom";
import styles from '../../style.module.css'; // For CSS Module styles

const Back = ({ title }) => {
  const location = useLocation();

  return (
    <>
      <section className={`${styles.back}`}>
        <h2>Home / {location.pathname.split("/")[1]}</h2>
        <h1>{title}</h1>
      </section>
      <div className={styles.margin}></div>
    </>
  );
};

export default Back;

