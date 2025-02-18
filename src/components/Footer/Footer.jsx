import React, { forwardRef } from "react";
import "./Footer.css";

const Footer = forwardRef((props,ref) => {
  return (
    <>
      <div className="footer-section" id="footer"  ref={ref}>
        <div className="section1">
          <h2>App Name</h2>
          <p>
            Swiggy is an Indian online food ordering and delivery company.
            Founded in 2014, Swiggy is headquartered in Bangalore and operates
            in more than 580 Indian cities, as of July 2023. Besides food
            delivery, the platform also provides quick commerce services under
            the name Swiggy Instamart, and same-day package deliveries with
            Swiggy Genie.
          </p>
          <div className="socialmediImages">
            <img src="../../../fb.png" alt="" />
            <img src="../../../twitter.png" alt="" />
            <img src="../../../inst.png" alt="" />
            <img src="../../../linked.png" alt="" />
          </div>
        </div>

        <div className="section2">
          <div className="section21">
            {" "}
            <strong>
              <h6>COMPONY</h6>
            </strong>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivary</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="section22">
            <strong>
              <h6>GET IN TOUCH</h6>
            </strong>
            <div>
              📞{" "}
              <a
                href="https://wa.me/919440988874"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                +91 9440988874 (WhatsApp)
              </a>
              </div>
              <div>
              ✉️{" "}
              <a
                href="mailto:nodemailer.dariya@gmail.com"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                nodemailer.dariya@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
     <div className="hrsection">
     <hr />
     </div>
    </>
  );
});

Footer.displayName = "Footer";
export default Footer;
