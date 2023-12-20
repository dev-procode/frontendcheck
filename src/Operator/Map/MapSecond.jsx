import React from "react";
import HeaderSecond from "../../Common/HeaderSecond";
import Sidebar from "../Sidebar/Sidebar";
import busgrey from "../../assets/images/busgrey.png";
import drivergrey from "../../assets/images/drivergrey.png";
import { useNavigate } from "react-router-dom";

const MapSecond = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderSecond />
      <section className="">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-lg-9">
              <div className="dbRgt">
                <div className="mapBg">
                  <div className="mapLeft">
                    <div className="mapTop">
                      <a href="operator/marketplace" className="angleft">
                        <i className="fa-solid fa-angle-left"></i>
                      </a>
                      <div className="mapCardbg">
                        <div
                          className="mapCardblock"
                          onClick={() => navigate("/map1")}
                        >
                          <h6>{`Capitol Height ->  Greenboro`}</h6>
                          <p>15-06-2023, 10:pm</p>
                          <div className="bkmaplft">
                            <div>
                              <span className="bcc">
                                <img src={busgrey} alt="" />
                              </span>{" "}
                              1 Mini Bus
                            </div>
                            <div>
                              <span className="bcc">
                                <img src={drivergrey} alt="" />
                              </span>{" "}
                              1 Driver
                            </div>
                          </div>
                          <span className="mapPrice">$26330.00</span>
                        </div>
                        <div
                          className="mapCardblock"
                          onClick={() => navigate("/map1")}
                        >
                          <h6>{`Capitol Height ->  Greenboro`}</h6>
                          <p>15-06-2023, 10:pm</p>
                          <div className="bkmaplft">
                            <div>
                              <span className="bcc">
                                <img src={busgrey} alt="" />
                              </span>{" "}
                              1 Mini Bus
                            </div>
                            <div>
                              <span className="bcc">
                                <img src={drivergrey} alt="" />
                              </span>{" "}
                              1 Driver
                            </div>
                          </div>
                          <span className="mapPrice">$26330.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="mapBtns mapBbtn">
                      <a href="">Submit All Bids</a>
                      <button className="commonButton">Mark as Sold Out</button>
                    </div>
                  </div>
                  <div className="mainMap">
                    <span className="expire">
                      <i className="fa-regular fa-stopwatch"></i> Expires in 4d
                      19hrs 9m
                    </span>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03605924756!2d-74.30932818346731!3d40.69753996510636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1687583790508!5m2!1sen!2sin"
                      width=""
                      height="450"
                      style={{ border: 0 }}
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
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

export default MapSecond;
