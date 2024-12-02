import React from "react";
import Back from "../common/back/Back";

const Intellect = () => {
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
        <h1 style={headingStyle}>Intellectual Property Policy</h1>
        <p>
          <strong>Effective Date:</strong> December 2, 2024
        </p>

        <h2 style={subheadingStyle}>Introduction</h2>
        <p>
          At Am Besten Academy, we respect the intellectual property rights of
          others and expect our users to do the same. This Intellectual Property
          Policy outlines our procedures for protecting intellectual property
          rights and responding to allegations of infringement.
        </p>

        <h2 style={subheadingStyle}>Copyright Policy</h2>
        <ul style={listStyle}>
          <li>
            <strong>Copyright Ownership:</strong> All content on our website and
            platform, including text, images, audio, and video, is the property
            of Am Besten Academy or our licensors.
          </li>
          <li>
            <strong>User-Generated Content:</strong> You retain ownership of any
            user-generated content you submit to our platform. However, by
            submitting such content, you grant us a non-exclusive, royalty-free,
            perpetual, and irrevocable license to use, reproduce, modify, adapt,
            publish, translate, and distribute such content.
          </li>
          <li>
            <strong>Copyright Infringement:</strong> If you believe that your
            copyrighted work has been infringed upon, please notify us in
            writing and provide us with the following information:
            <ul style={{ marginLeft: "40px" }}>
              <li>
                A physical or electronic signature of the copyright owner or
                authorized representative.
              </li>
              <li>
                Identification of the copyrighted work claimed to have been
                infringed.
              </li>
              <li>
                Identification of the material that is claimed to be infringing
                or to be the subject of infringing activity and that is to be
                removed or access to which is to be disabled.
              </li>
              <li>
                Information reasonably sufficient to permit us to contact the
                complaining party.
              </li>
            </ul>
          </li>
        </ul>

        <h2 style={subheadingStyle}>Trademark Policy</h2>
        <ul style={listStyle}>
          <li>
            <strong>Trademark Ownership:</strong> Our trademarks, logos, and
            service marks are the property of Am Besten Academy.
          </li>
          <li>
            <strong>Prohibited Use:</strong> You may not use our trademarks,
            logos, or service marks without our prior written consent.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Patent Policy</h2>
        <ul style={listStyle}>
          <li>
            <strong>Patent Ownership:</strong> Our patents and patent
            applications are the property of Am Besten Academy.
          </li>
          <li>
            <strong>Prohibited Use:</strong> You may not use our patented
            inventions or pending patent applications without our prior written
            consent.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Enforcement</h2>
        <ul style={listStyle}>
          <li>
            <strong>Notice and Takedown:</strong> We will respond to allegations
            of intellectual property infringement in accordance with our Notice
            and Takedown Policy.
          </li>
          <li>
            <strong>Repeat Infringers:</strong> We reserve the right to
            terminate the accounts of repeat infringers.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Disclaimer</h2>
        <p>
          We are not responsible for any user-generated content that may
          infringe on the intellectual property rights of others.
        </p>

        <h2 style={subheadingStyle}>
          Changes to this Intellectual Property Policy
        </h2>
        <p>
          We reserve the right to modify this Intellectual Property Policy at
          any time. We will notify you of any changes by posting the updated
          policy on our website.
        </p>

        <h2 style={subheadingStyle}>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Intellectual Property
          Policy, please contact us at{" "}
          <a href="mailto:ambestenacademy@gmail.com" style={linkStyle}>
            ambestenacademy@gmail.com
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default Intellect;
