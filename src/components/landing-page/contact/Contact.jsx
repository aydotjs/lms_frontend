import React from "react";
import Back from "../common/back/Back";
import "./contact.css";

import styles from "../style.module.css";
const Contact = () => {
  // Updated map URL for the correct Google Maps iframe
  const map =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2373.419462023619!2d-1.2988624242900166!3d53.49670196346401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487973beb6c0486b%3A0xb501a4905df7b6d!2s1%20Oliver%20St%2C%20Mexborough%20S64%209NW%2C%20UK!5e0!3m2!1sen!2sng!4v1732912509033!5m2!1sen!2sng";

  return (
    <>
      <Back title="Contact us" />
      <section className="contacts padding">
        <div className="container shadow flexSB">
          <div className="left row">
            {/* Updated iframe for Google Maps */}
            <iframe
              src={map}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="right row">
            <h1>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>

            <div className="items grid2">
              <div className="box">
                <h4>ADDRESS:</h4>
                <p>1 Oliver Street, Mexborough, Doncaster S64 9NW</p>
              </div>
              <div className="box">
                <h4>EMAIL:</h4>
                <p>ambestenacademy@gmail.com</p>
              </div>
              <div className="box">
                <h4>PHONE:</h4>
                <p>+447553544846</p>
              </div>
            </div>

            <form action="">
              <div className="flexSB">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
              </div>
              <input type="text" placeholder="Subject" />
              <textarea
                cols="30"
                rows="10"
                placeholder="Create a message here..."
              ></textarea>
              <button className="primary-btn">SEND MESSAGE</button>
            </form>

            <h3>Follow us here</h3>
            <span>FACEBOOK TWITTER INSTAGRAM TIKTOK</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
