import React from "react";
import Back from "../common/back/Back";

const Cookies = () => {
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

  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
  };

  const listStyle = {
    marginLeft: "20px",
    listStyleType: "disc",
  };

  return (
    <>
      <Back />
      <div style={containerStyle}>
        <h1 style={headingStyle}>Cookies Policy</h1>
        <p>
          <strong>Effective Date:</strong> December 2, 2024
        </p>

        <h2 style={subheadingStyle}>Introduction</h2>
        <p>
          We use cookies on our website{" "}
          <a
            href="https://www.ambestenacademy.com"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            https://www.ambestenacademy.com
          </a>{" "}
          (the "Site") to provide a better user experience and to improve our
          services. This Cookie Policy explains what cookies are, how we use
          them, and how you can manage them.
        </p>

        <h2 style={subheadingStyle}>What are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device when you
          visit a website. They allow us to recognize your device and store
          information about your preferences and behavior.
        </p>

        <h2 style={subheadingStyle}>Types of Cookies We Use</h2>
        <ul style={listStyle}>
          <li>
            <strong>Session Cookies:</strong> These cookies are temporary and
            are deleted when you close your browser.
          </li>
          <li>
            <strong>Persistent Cookies:</strong> These cookies remain on your
            device until they expire or are deleted.
          </li>
          <li>
            <strong>Third-Party Cookies:</strong> These cookies are set by
            third-party providers, such as Google Analytics.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Purposes of Using Cookies</h2>
        <ul style={listStyle}>
          <li>
            <strong>Authentication:</strong> To authenticate users and verify
            their identity.
          </li>
          <li>
            <strong>Personalization:</strong> To store information about your
            preferences and behavior.
          </li>
          <li>
            <strong>Analytics:</strong> To track user behavior and improve our
            services.
          </li>
          <li>
            <strong>Advertising:</strong> To deliver targeted advertising.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Managing Cookies</h2>
        <p>You can manage cookies by:</p>
        <ul style={listStyle}>
          <li>
            <strong>Blocking Cookies:</strong> You can block cookies by
            activating the setting on your browser that allows you to refuse the
            setting of all or some cookies.
          </li>
          <li>
            <strong>Deleting Cookies:</strong> You can delete cookies by
            clearing your browser's cookie cache.
          </li>
          <li>
            <strong>Opting Out:</strong> You can opt out of third-party cookies
            by visiting the relevant provider's website.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Changes to this Cookie Policy</h2>
        <p>
          We reserve the right to modify this Cookie Policy at any time. We will
          notify you of any changes by posting the updated Cookie Policy on the
          Site.
        </p>

        <p>
          By using our Site, you consent to the use of cookies as described in
          this Cookie Policy.
        </p>
      </div>
    </>
  );
};

export default Cookies;
