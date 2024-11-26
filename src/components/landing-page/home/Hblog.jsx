import React from "react"
import "../blog/blog.css"
import { blog } from "../dummydata"
import Heading from "../common/heading/Heading"
import styles from "../style.module.css"
// copy code of blog => blogCard

const Hblog = () => {
  return (
    <>
      <section className='blog'>
        <div className={`${styles.container}`}>
        <div id={`${styles.heading}`}>
        <h3>OUR BLOG </h3>
        <h1 >Recent From Blog</h1>
      </div>
          {/* <Heading subtitle='OUR BLOG' title='Recent From Blog' style = {{border : "2px solid red"}} /> */}
          <div className={`${styles.grid2}`}>
            {blog.slice(0, 3).map((val) => (
              <div className='items shadow'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <div className={`admin ${styles.flexSB}`}>
                    <span>
                      <i className='fa fa-user'></i>
                      <label htmlFor=''>{val.type}</label>
                    </span>
                    <span>
                      <i className='fa fa-calendar-alt'></i>
                      <label htmlFor=''>{val.date}</label>
                    </span>
                    <span>
                      <i className='fa fa-comments'></i>
                      <label htmlFor=''>{val.com}</label>
                    </span>
                  </div>
                  <h1>{val.title}</h1>
                  <p>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Hblog
