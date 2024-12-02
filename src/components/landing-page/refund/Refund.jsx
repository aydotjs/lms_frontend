import React from "react";
import Back from "../common/back/Back";

const Refund = () => {
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
  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
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
        <h1 style={headingStyle}>Refund and Cancellation Policy</h1>
        <p>
          <strong>Effective Date:</strong> December 2, 2024
        </p>

        <h2 style={subheadingStyle}>Introduction</h2>
        <p>
          At Am Besten Academy, we understand that sometimes circumstances may
          change, and you may need to cancel or request a refund for our
          services. This Refund and Cancellation Policy outlines the procedures
          and guidelines for requesting a refund or cancellation.
        </p>

        <h2 style={subheadingStyle}>Cancellation Policy</h2>
        <ul style={listStyle}>
          <li>
            <strong>Notice Period:</strong> You must provide us with at least 24
            hours notice prior to the scheduled lesson or course start date to
            be eligible for a refund or cancellation.
          </li>
          <li>
            <strong>Cancellation Methods:</strong> You can cancel your
            subscription or lesson by contacting us through our website, email,
            or phone.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Refund Policy</h2>
        <ul style={listStyle}>
          <li>
            <strong>Refund Eligibility:</strong> You are eligible for a refund
            if you cancel your subscription or lesson within the notice period.
          </li>
          <li>
            <strong>Refund Amount:</strong> The refund amount will be calculated
            based on the number of unused lessons or courses.
          </li>
          <li>
            <strong>Refund Methods:</strong> Refunds will be processed through
            the original payment method.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Exceptions</h2>
        <ul style={listStyle}>
          <li>
            <strong>Abuse of Services:</strong> If we determine that you have
            abused our services, we may refuse a refund or cancellation.
          </li>
          <li>
            <strong>Violation of Terms:</strong> If you have violated our Terms
            and Conditions, we may refuse a refund or cancellation.
          </li>
        </ul>

        <h2 style={subheadingStyle}>
          Procedure for Requesting a Refund or Cancellation
        </h2>
        <ul style={listStyle}>
          <li>
            <strong>Contact Us:</strong> You can request a refund or
            cancellation by contacting us through our website, email, or phone.
          </li>
          <li>
            <strong>Provide Notice:</strong> You must provide us with the
            required notice period prior to the scheduled lesson or course start
            date.
          </li>
          <li>
            <strong>Refund Processing:</strong> We will process your refund
            within 5 - 7 working days.
          </li>
        </ul>

        <h2 style={subheadingStyle}>
          Changes to this Refund and Cancellation Policy
        </h2>
        <p>
          We reserve the right to modify this Refund and Cancellation Policy at
          any time. We will notify you of any changes by posting the updated
          policy on our website.
        </p>

        <h2 style={subheadingStyle}>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Refund and
          Cancellation Policy, please contact us at {" "}
          <a href="mailto:ambestenacademy@gmail.com" style={linkStyle}>
            ambestenacademy@gmail.com
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default Refund;
