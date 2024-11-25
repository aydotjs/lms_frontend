import React from "react"
import { testimonial } from "../../../../dummydata"
import Heading from "../../common/heading/Heading"
import "./style.css"

const Testimonal = () => {
  return (
    <>
      <section className='testimonal padding'>
        <div className='container'>
          <Heading subtitle='TESTIMONIAL' title='Our Successful Students' />

          <div className='content grid2'>
            {testimonial.map((val) => {
              console.log(val)
              return(
              <div className='items shadow'>
                <div className='box flex'>
                  <div className='img'>
                    <img src={val.photo} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.feedback}</p>
              </div>)
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonal
