import React from "react";
import Back from "../common/back/Back";

const Terms = () => {
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
    listStyleType: "decimal",
  };

  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
  };

  return (
    <>
      <Back />
      <div style={containerStyle}>
        <h1 style={headingStyle}>Terms and Conditions</h1>
        <p>
          <strong>Effective Date:</strong> December 2, 2024
        </p>
        <p>
          Please read these Terms and Conditions ("Terms") carefully before
          using the Am Besten Academy website{" "}
          <a
            href="https://www.ambestenacademy.com"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            https://www.ambestenacademy.com
          </a>{" "}
          (the "Site") and our online language learning platform (the
          "Platform"). By using the Site and Platform, you agree to be bound by
          these Terms.
        </p>

        <h2 style={subheadingStyle}>Definitions</h2>
        <ul style={listStyle}>
          <li>
            <strong>"We", "Us", "Our":</strong> Refers to Am Besten Academy.
          </li>
          <li>
            <strong>"You", "Your":</strong> Refers to the user of the Site and
            Platform.
          </li>
          <li>
            <strong>"Services":</strong> Refers to the language learning
            services provided through the Platform.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Use of the Site and Platform</h2>
        <ul style={listStyle}>
          <li>Eligibility: You must be at least 13 years old to use the Site and Platform.</li>
          <li>
            Registration: You must provide accurate and complete information
            when registering for an account on the Platform.
          </li>
          <li>
            Account Security: You are responsible for maintaining the
            confidentiality of your account login credentials.
          </li>
          <li>
            Prohibited Use: You agree not to use the Site and Platform for any
            unlawful or unauthorized purposes.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Intellectual Property</h2>
        <ul style={listStyle}>
          <li>
            Copyright: The Site and Platform contain proprietary and copyrighted
            materials.
          </li>
          <li>
            Trademarks: Our trademarks and logos are protected by intellectual
            property laws.
          </li>
          <li>
            User-Generated Content: You retain ownership of any user-generated
            content you submit to the Platform.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Payment Terms</h2>
        <ul style={listStyle}>
          <li>
            Fees: You agree to pay all fees and charges associated with your use
            of the Services.
          </li>
          <li>
            Payment Methods: We accept various payment methods, including credit
            cards and online payment processors.
          </li>
          <li>
            Refunds: Our refund policy is outlined in our Refund and
            Cancellation Policy.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Disclaimer of Warranties</h2>
        <ul style={listStyle}>
          <li>
            As-Is Basis: The Site and Platform are provided on an "as-is" and
            "as-available" basis.
          </li>
          <li>
            No Warranties: We disclaim all warranties, express or implied,
            including the implied warranties of merchantability, fitness for a
            particular purpose, and non-infringement.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Limitation of Liability</h2>
        <ul style={listStyle}>
          <li>
            No Liability: We will not be liable for any damages, including
            incidental, consequential, or punitive damages, arising out of your
            use of the Site and Platform.
          </li>
          <li>
            Limitation of Damages: Our liability will be limited to the amount
            of fees you have paid to us.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Indemnification</h2>
        <p>
          You agree to indemnify and hold us harmless from any claims, damages,
          or expenses arising out of your breach of these Terms.
        </p>

        <h2 style={subheadingStyle}>Governing Law</h2>
        <p>
          These Terms will be governed by and construed in accordance with the
          laws of The United Kingdom. Any disputes arising out of these Terms
          will be resolved through the management and admins of this platform.
        </p>

        <h2 style={subheadingStyle}>Changes to these Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify
          you of any changes by posting the updated Terms on the Site and
          Platform.
        </p>

        <h2 style={subheadingStyle}>Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us at{" "}
          <a
            href="mailto:ambestenacademy@gmail.com"
            style={linkStyle}
          >
            ambestenacademy@gmail.com
          </a>.
        </p>

        <p>
          By using the Site and Platform, you agree to be bound by these Terms.
          If you do not agree to these Terms, you may not use the Site and
          Platform.
        </p>
      </div>
    </>
  );
};

export default Terms;
