import React from "react";
import Back from "../common/back/Back";

const Payment = () => {
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
  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
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
        <h1 style={headingStyle}>Payment Terms and Conditions</h1>
        <p>
          <strong>Effective Date:</strong> December 2, 2024
        </p>

        <h2 style={subheadingStyle}>Introduction</h2>
        <p>
          At Am Besten Academy, we offer various payment options to make it easy
          for you to purchase our services. This Payment Terms and Conditions
          policy outlines the procedures and guidelines for making payments to
          us.
        </p>

        <h2 style={subheadingStyle}>Payment Methods</h2>
        <ul style={listStyle}>
          <li>
            <strong>Credit/Debit Cards:</strong> We accept major credit and
            debit cards, including Visa, Mastercard, American Express, and
            Discover.
          </li>
          <li>
            <strong>Online Payment Processors:</strong> We accept payments
            through online payment processors, such as PayPal and Stripe.
          </li>
          <li>
            <strong>Bank Transfers:</strong> We accept bank transfers for large
            payments or for customers who prefer this method.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Payment Terms</h2>
        <ul style={listStyle}>
          <li>
            <strong>Payment Due Date:</strong> Payment is due upon registration
            or on the specified due date for each payment installment.
          </li>
          <li>
            <strong>Late Payment Fees:</strong> A late payment fee of 10% may be
            applied to unpaid balances after 3 days of non-payment.
          </li>
          <li>
            <strong>Payment Plans:</strong> We offer payment plans for certain
            services. Please contact us for more information.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Refunds and Cancellations</h2>
        <ul style={listStyle}>
          <li>
            <strong>Refund Policy:</strong> Our refund policy is outlined in our
            Refund and Cancellation Policy.
          </li>
          <li>
            <strong>Cancellation Policy:</strong> Our cancellation policy is
            outlined in our Refund and Cancellation Policy.
          </li>
        </ul>

        <h2 style={subheadingStyle}>Security and Data Protection</h2>
        <ul style={listStyle}>
          <li>
            <strong>Secure Payment Processing:</strong> Our payment processing
            system is secure and compliant with industry standards.
          </li>
          <li>
            <strong>Data Protection:</strong> We protect your personal and
            payment information in accordance with our Privacy Policy.
          </li>
        </ul>

        <h2 style={subheadingStyle}>
          Changes to this Payment Terms and Conditions Policy
        </h2>
        <p>
          We reserve the right to modify this Payment Terms and Conditions
          policy at any time. We will notify you of any changes by posting the
          updated policy on our website.
        </p>

        <h2 style={subheadingStyle}>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Payment Terms and
          Conditions policy, please contact us at{" "}
          <a href="mailto:ambestenacademy@gmail.com" style={linkStyle}>
            ambestenacademy@gmail.com
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default Payment;
