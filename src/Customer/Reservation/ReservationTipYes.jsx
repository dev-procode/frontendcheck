import React from "react";
import HeaderSecond from "../../Common/HeaderSecond";
import { useNavigate } from "react-router-dom";

const ReservationTipYes = () => {
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
              <button class="">
                <span>Cost</span>
              </button>
              <button>
                <span>Reserve</span>
              </button>
            </div>
            <div class="">
              <div class="reservationTrip">
                <div class="mapadd2 addressLocate">
                  <span class="mapbox2"></span>

                  <div class="row">
                    <div class="col-md-6">
                      <label>
                        <span>*</span>Day for the pickup
                      </label>
                      <input type="date" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label>&nbsp;</label>
                      <button
                        class="commonButton delDay"
                        onclick="window.location.href = 'reservation-trip.html';"
                      >
                        <i class="fa-solid fa-trash"></i> Delete Day trip
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mapadd2 addressLocate">
                  <span class="mapbox2"></span>
                  <label>
                    <span>*</span>Departure
                  </label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    placeholder="Washington D.C., DC, USA"
                  />
                </div>

                <div class="mapadd2 addressLocate">
                  <span class="mapbox2"></span>
                  <label>
                    <span>*</span>Destination (A)
                  </label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    placeholder="Washington D.C., DC, USA"
                  />
                </div>
              </div>

              <div class="costMiddle">
                <button class="commonButton" onClick={()=>navigate('/reservationTrip')}>Previous Trip</button>
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

export default ReservationTipYes;
