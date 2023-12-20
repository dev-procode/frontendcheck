import React from "react";
import footercar from '../assets/images/footercar.png'
import footerlogo from '../assets/images/footerlogo.png'


const Footer = () => {
  return (
    <footer>
      <section class="footerTop">
        <div class="footercar">
          <img src={footercar} alt="" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-4 footerLogobg">
              <h6>Contact</h6>
              <img src={footerlogo} alt="" />
              <div class="footContact">
                <i class="fa-solid fa-envelope"></i>
                <span>sales@CharterSUB.com</span>
              </div>
              <div class="footContact">
                <i class="fa-solid fa-envelope"></i>
                <span>support@CharterSUB.com</span>
              </div>
              <div class="footContact">
                <i class="fa-solid fa-envelope"></i>
                <span>communications@CharterSUB.com</span>
              </div>
              <div class="footContact">
                <i class="fa-solid fa-phone"></i>
                <span>1-855-920-2287</span>
              </div>
              <div class="footerbtmright footerfollow">
                <span>
                  <a href="">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                </span>
                <span>
                  <a href="">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                </span>
                <span>
                  <a href="">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
                </span>
                <span>
                  <a href="">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                </span>
              </div>
            </div>
            <div class="col-lg-3">
              <h6>CHARTER SOLUTIONS</h6>
              <ul>
                <li>
                  <a href="">Charters For Schools</a>
                </li>
                <li>
                  <a href="">Charters for Teams</a>
                </li>
                <li>
                  <a href="">Charters for Airlines</a>
                </li>
                <li>
                  <a href="">Charters for Religious Groups</a>
                </li>
                <li>
                  <a href="">Charters for Government</a>
                </li>
                <li>
                  <a href="">Charters for Emergency Services</a>
                </li>
                <li>
                  <a href="">Charters for Travel Agents</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-3">
              <h6>SHUTTLE SOLUTIONS</h6>
              <ul>
                <li>
                  <a href="">Shuttles for University &amp; Campuses</a>
                </li>
                <li>
                  <a href="">Shuttles for Corporations &amp; Employees</a>
                </li>
                <li>
                  <a href="">Shuttles for Hospitals &amp; Healthcare Workers</a>
                </li>
                <li>
                  <a href="">Shuttles for Airports</a>
                </li>
                <li>
                  <a href="">Shuttles for Religious Groups</a>
                </li>
                <li>
                  <a href="">Shuttles for Private Events</a>
                </li>
                <li>
                  <a href="">Shuttles for Urgent &amp; On Demand</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-2">
              <h6>COMPANY</h6>
              <ul>
                <li>
                  <a href="">About Us</a>
                </li>
                <li>
                  <a href="">Join Us</a>
                </li>
                <li>
                  <a href="">Blog</a>
                </li>
                <li>
                  <a href="">Partner With Us</a>
                </li>
                <li>
                  <a href="">Cities We Serve</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="footerBtm">
                <p>
                  Terms &amp; Conditions • Terms &amp; Conditions for
                  Transportation Reservations • Privacy Policy
                </p>
                <p>&copy; 2023 CharterSUB, LLC. All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
