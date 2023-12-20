import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderSecond from "../../Common/HeaderSecond";
import { useNavigate } from "react-router-dom";
import bookcar from "../../assets/images/bookcar.png";
import { RotatingLines } from "react-loader-spinner";

const Cost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reservation);
  const { isLoading, details } = state;
  console.log("state", state);
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
              <button>
                <span>Reserve</span>
              </button>
            </div>
            <div class="costMiddle">
              <button
                class="commonButton"
                onClick={() => navigate("/reservationTrip")}
              >
                <i class="fa-solid fa-reply"></i> Go Back
              </button>
              <div style={{ minHeight: "120px" }}>
                {isLoading ? (
                  <div className="loaderrev">
                    <RotatingLines
                      strokeColor="black"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="96"
                      visible={isLoading}
                    />
                  </div>
                ) : (
                  details.length != 0 &&
                  details.map((data, i) => (
                    <div class="bookedcar" key={i}>
                      <img src={bookcar} alt="" />
                      <div class="bookcartxt">
                        <h6>{data?.vehicletype_name}</h6>
                        <p>{data?.vehicle_units} x {data?.vehicle_capacity} (capacity)</p>
                        {/* <p>
                          Unit:
                          {data?.vehicle_units}
                        </p>
                        <p>
                          <i class="fa-light fa-user"></i>{" "}
                          {data?.vehicle_capacity}
                        </p> */}
                        <p>
                          Price: <strong>${data?.travel_price}</strong>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button class="commonButton" onClick={() => navigate("/cost2")}>
                Continue
              </button>
            </div>
          </div>
        </div>
        <div class="costMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03605924756!2d-74.30932818346731!3d40.69753996510636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1687583790508!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Cost;
