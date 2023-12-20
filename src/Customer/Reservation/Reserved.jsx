import React from "react";
import HeaderSecond from "../../Common/HeaderSecond";
import { useNavigate } from "react-router-dom";

const Reserved = () => {
  const navigate=useNavigate()
  return (
    <div>
      <HeaderSecond />
      <section class="costbg">
        <div class="costLft">
          <div class="costinn">
            <div class="bookingNavigate costnavigate">
              <button class="active">
                <span>Trip</span>
              </button>
              <button class="active">
                <span>Cost</span>
              </button>
              <button class="active">
                <span>Reserve</span>
              </button>
            </div>
            <div class="">
              <div class="reservedComplete">
                <i class="fa-solid fa-circle-check"></i>
                <h5>Thank You</h5>
                <p>
                  We have received your reservation and well get back to you
                  soon.
                </p>
                <p>
                  For any further enquiries, Please contact: <br />{" "}
                  <a href="">info@demomail.com</a>
                </p>
              </div>

              <div class="costMiddle">
                <button
                  class="commonButton"
                  onClick={()=>navigate('/reservationTrip')}
                >
                  <i class="fa-solid fa-reply"></i> Back
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="costMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03605924756!2d-74.30932818346731!3d40.69753996510636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1687583790508!5m2!1sen!2sin"
            width=""
            height=""
            style={{"border":0}}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Reserved;
