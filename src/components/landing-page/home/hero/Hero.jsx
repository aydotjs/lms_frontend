import React from "react"
import Heading from "../../common/heading/Heading"
import  "./Hero.css"
import styles from '../../style.module.css'; // For CSS Module styles
const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className={`${styles.container} container`}>
          <div className={`${styles.row} row`}>
            <div>
              <h3>WELCOME TO AMBESTEN</h3>
              <h1>Best Online Education Expertise</h1>
            </div>
            {/* <Heading subtitle='WELCOME TO AMBESTEN' title='Best Online Education Expertise' /> */}
            <p>Make language learning a habit. Set aside time each day for practice. 5 minutes daily could become a lot</p>
            <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className={`${styles.margin}`}></div>
    </>
  )
}

export default Hero
