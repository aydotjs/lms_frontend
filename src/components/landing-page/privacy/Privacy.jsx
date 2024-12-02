import React from "react";
import Back from "../common/back/Back";
const Privacy = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
    color: "#333",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#222",
  };

  const subheadingStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#444",
  };

  const listStyle = {
    marginLeft: "20px",
    listStyleType: "disc",
  };

  return (
    <>
      <Back />
      <div style={containerStyle}>
        <h1 style={headingStyle}>Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> December 2, 2024
        </p>
        <p>
          Am Besten Academy ("We", "Us", "Our") is committed to protecting the
          privacy and security of our users' personal information. This Privacy
          Policy explains how we collect, use, disclose, and protect personal
          information obtained through our website:
          <a
            href="https://www.ambestenacademy.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            {" "}
            https://www.ambestenacademy.com
          </a>{" "}
          (the "Site") and our online language learning platform (the
          "Platform").
        </p>

        <h2 style={subheadingStyle}>Information Collection</h2>
        <ul style={listStyle}>
          <li>
            <strong>Registration:</strong> When you register for an account on
            our Platform, we collect your name, email address, password, and
            other contact information.
          </li>
          <li>
            <strong>Payment Processing:</strong> When you make a payment through
            our Platform, we do not collect or store your card details. Payments
            are securely processed by Stripe, a trusted and secure payment
            platform, which ensures your financial information is protected.
          </li>
          <li>
            <strong>User-Generated Content:</strong> When you interact with our
            Platform, we collect user-generated content, such as messages,
            posts, and feedback.
          </li>
          <li>
            <strong>Technical Data:</strong> We collect technical data, such as
            IP addresses, browser types, and device information, when you visit
            our Site or use our Platform.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Use of Personal Information</h2>
        <ul style={listStyle}>
          <li>Providing our Services</li>
          <li>Communication</li>
          <li>Marketing</li>
          <li>Improvement</li>
        </ul>

        <h2 style={subheadingStyle}>Disclosure of Personal Information</h2>
        <ul style={listStyle}>
          <li>Service Providers</li>
          <li>Tutors</li>
          <li>Law Enforcement</li>
          <li>Business Transfers</li>
        </ul>

        <h2 style={subheadingStyle}>Security Measures</h2>
        <ul style={listStyle}>
          <li>Encryption</li>
          <li>Firewalls</li>
          <li>Access Controls</li>
        </ul>

        <h2 style={subheadingStyle}>User Rights</h2>
        <ul style={listStyle}>
          <li>Access</li>
          <li>Erasure</li>
          <li>Restriction</li>
          <li>Portability</li>
        </ul>

        <h2 style={subheadingStyle}>Changes to this Privacy Policy</h2>
        <p>
          We reserve the right to modify this Privacy Policy at any time. We
          will notify you of any changes by posting the updated Privacy Policy
          on our Site and Platform.
        </p>

        <h2 style={subheadingStyle}>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at 
          <a 
            href="mailto:ambestenacademy@gmail.com"
            style={{ color: "#007bff", textDecoration: "none", marginLeft : "4px" }}
          >
            ambestenacademy@gmail.com
          </a>
          .
        </p>

        <p>
          By using our Site and Platform, you consent to the collection, use,
          and disclosure of your personal information as described in this
          Privacy Policy.
        </p>
      </div>
    </>
  );
};

export default Privacy;
