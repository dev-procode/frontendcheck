import React from "react";
import HeaderSecond from "../../../Common/HeaderSecond";
import busgrey from "../../../assets/images/busgrey.png";
import drivergrey from "../../../assets/images/drivergrey.png";
import Sidebar from "../../Sidebar/Sidebar";

const Booking = () => {
  return (
    <div>
      <HeaderSecond />
      <section class="">
        <div class="container">
          <div class="row">
            <Sidebar />
            <div class="col-lg-9">
              <div class="dbRgt">
                <div class="bookinghdn">
                  <h4>Your Bookings</h4>
                </div>
                <div class="bookingNavigate">
                  <button class="active">
                    <span>1/3 Accept or Reject the job</span>
                  </button>
                  <button>
                    <span>2/3 Assign Drivers and Vehiches</span>
                  </button>
                  <button>
                    <span>3/3 Driver Tracking</span>
                  </button>
                </div>
                <div class="bookingRank borderBtm">
                  <div class="bookingHdn">
                    <h5>Bowie to Ronks</h5>
                    <a href="/operator/booking/upcoming" class="upBtn">
                      Upcoming
                    </a>
                  </div>
                  <h6>ID: 489256</h6>
                </div>
                <div class="row">
                  <div class="col-md-3 bkmaplft">
                    <div>
                      <i class="fa-regular fa-rectangle-vertical-history"></i>{" "}
                      History
                    </div>
                    <div>
                      <span class="bcc">
                        <img src={busgrey} alt="" />
                      </span>{" "}
                      3 Charter Buses
                    </div>
                    <div>
                      <span class="bcc">
                        <img src={drivergrey} alt="" />
                      </span>{" "}
                      3 Drivers
                    </div>
                    <div>
                      <i class="fa-regular fa-ship"></i> 150 Passengers
                    </div>
                  </div>
                  <div class="col-md-9 bookMap">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.3784963333915!2d-76.84034482441349!3d38.91532557172023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c01008a8f1d5%3A0xe34653fed30a846d!2s9800%20Lottsford%20Rd%2C%20Bowie%2C%20MD%2020721%2C%20USA!5e0!3m2!1sen!2sin!4v1687105716712!5m2!1sen!2sin"
                      width=""
                      height="240"
                      style={{"border":0}}
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div class="zigzac">
                  <div class="zigzacInn">
                    <div class="mappad1 actv">
                      <div class="mapadd1">
                        <h6>9800 Lottsford Rd, Bowle, MD 20721</h6>
                        <p>Spot time: 09-06-2023, 7:45 am EDT</p>
                        <p>Pickup Time: 09-06-2023, 8:00 am EDT</p>
                        <span class="mapbox"></span>
                      </div>
                    </div>
                    <div class="mappad2">
                      <div class="mapadd2">
                        <span class="mapbox2"></span>
                        <h6>9800 Lottsford Rd, Bowle, MD 20721</h6>
                        <p>Spot time: 09-06-2023, 7:45 am EDT</p>
                        <p>Pickup Time: 09-06-2023, 8:00 am EDT</p>
                      </div>
                    </div>
                    <div class="mappad1">
                      <div class="mapadd1">
                        <h6>9800 Lottsford Rd, Bowle, MD 20721</h6>
                        <p>Spot time: 09-06-2023, 7:45 am EDT</p>
                        <p>Pickup Time: 09-06-2023, 8:00 am EDT</p>
                        <span class="mapbox"></span>
                      </div>
                    </div>
                    <div class="mappad2">
                      <div class="mapadd2">
                        <span class="mapbox2"></span>
                        <h6>9800 Lottsford Rd, Bowle, MD 20721</h6>
                        <p>Spot time: 09-06-2023, 7:45 am EDT</p>
                        <p>Pickup Time: 09-06-2023, 8:00 am EDT</p>
                      </div>
                    </div>
                    <div class="mappad1">
                      <div class="mapadd1">
                        <h6>9800 Lottsford Rd, Bowle, MD 20721</h6>
                        <p>Spot time: 09-06-2023, 7:45 am EDT</p>
                        <p>Pickup Time: 09-06-2023, 8:00 am EDT</p>
                        <span class="mapbox"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="payStatus mb-5">
                  <div class="payStatus-a">
                    <h5>Payment Status</h5>
                    <div class="paywhite">
                      <div class="payPrice">
                        <span>initial Price:</span>
                        <span>$6,000.00</span>
                      </div>
                      <div class="payPrice">
                        <span>CharterSUB Fee:</span>
                        <span>-$600.00</span>
                      </div>
                      <div class="payPrice noBordr">
                        <span>Base Fare:</span>
                        <span>-$450.00</span>
                      </div>
                      <div class="total">
                        <span>Total:</span>
                        <span>$5,850.00</span>
                      </div>
                      <div class="total">
                        <span>Balance:</span>
                        <span>$5,850.00</span>
                      </div>
                    </div>
                  </div>
                  <div class="payStatus-b">
                    <h5>Comments</h5>
                    <h6>Kyle Verhaeg-03-15-2023, 3:10pm</h6>
                    <h6>CharterSUB</h6>
                    <p>Updated itinerary as per email confirmation</p>
                    <br />
                    <p>
                      <strong>Add Comment</strong>
                    </p>
                    <textarea placeholder=""></textarea>
                  </div>
                </div>

                <div class="bookcontactbg">
                  <div class="bcleft">
                    <h5>Contact Information</h5>
                    <p>Charter Up</p>
                    <p class="pb-4">
                      <a href="">Send Message</a>
                    </p>
                    <p>Email:</p>
                    <p class="pb-4">demo@gmail.com</p>
                    <p>Phone:</p>
                    <p>(012)123456</p>
                  </div>
                  <div class="bcright">
                    <h5>Need to cancel this booking?</h5>
                    <p class="pb-4">
                      <a href="">Request Cancellation</a>
                    </p>
                  </div>
                </div>

                <div class="havequestion">
                  <h5>Have a question about the trip?</h5>
                  <p>
                    Click <a href="">support</a> to raise a ticket via phone or
                    email
                  </p>
                </div>

                <div class="bookingFoot mb-5">
                  <div class="bookingtxt">
                    <p>
                      Operator <a href="">Cancellation Penalties</a>.{" "}
                    </p>
                    <p>
                      {" "}
                      <a href="">Terms and Conditions</a> for Providers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
