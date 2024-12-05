import React from "react"
import styles from '../../style.module.css'; // For CSS Module styles
const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div id={`${styles["heading"]}`}>
        <h3>{subtitle} </h3>
        <h1 >{title} </h1>
      </div>
    </>
  )
}

export default Heading
