import React from "react"
import Back from "../common/back/Back"
import BlogCard from "./BlogCard"
import "./blog.css"
import styles from "../style.module.css"
const Blog = () => {
  return (
    <>
      <Back title='Blog Posts' />
      <section className={`blog ${styles.padding}`}>
        <div className={`${styles.container} ${styles.grid2}`}>
          <BlogCard />
        </div>
      </section>
    </>
  )
}

export default Blog
