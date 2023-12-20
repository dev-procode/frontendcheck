import React from "react";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import bus from "../../../assets/images/bus.png";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import events from "./events";

const Availability = () => {
  return (
    <div>
      <HeaderSecond />
      <section className="">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-lg-9">
              <div className="dbRgt">
                <div className="bookinghdn">
                  <div className="availdate">
                    <input type="text" placeholder="30-05-2023" />
                    <button className="commonButton">Today</button>
                  </div>
                  <div>
                    <button className="commonButton">Un Availability</button>
                    &nbsp;
                    <button className="commonButton">
                      <i className="fa-solid fa-bars-filter"></i> Filter
                    </button>
                  </div>
                </div>
                <select className="selectdrop">
                  <option>Vehicles</option>
                </select>
                <div className="choosevariety mb-4">
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                  <div className="choosewhite">
                    <span className="circlebus">
                      <img src={bus} alt="" />
                    </span>
                    <div>
                      <h6>Default 1</h6>
                      <p>Charter Bus</p>
                    </div>
                  </div>
                </div>

                <div className="evntCal mb-5">
                  {/* <div className="site-header autocomplete">
                              <div className="input-wrapper">
                                <input type="text" placeholder="Search" className="search-field" />
                                  <span className="close">Cancel</span>

                                <div className="focus-background"></div>
                              </div>
                               <div className="dialog">   
                              </div>

                            </div> */}

                  {/* <div id="calendar" className="calendarevent"></div> */}
                  <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                      left: "prev,next",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin]}
                    events={events}
                  />
                  {/* <FullCalendar
                    defaultView="dayGridMonth"
                    themeSystem="Simplex"
                    header={{
                      left: "prev,next",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    plugins={[dayGridPlugin]}
                    events={events}
                    displayEventEnd="true"
                    eventColor={
                      "#" + Math.floor(Math.random() * 16777215).toString(16)
                    }
                  /> */}

                  <div id="calendar-popup">
                    <form id="event-form">
                      <div className="calander_popip_title">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                        Add Event
                      </div>
                      <ul>
                        <li>
                          <label for="event-start">
                            <i className="fa fa-bell-o" aria-hidden="true"></i>
                            From
                          </label>
                          <input
                            id="event-start"
                            className="form-control"
                            type="datetime-local"
                            name="start"
                          />
                        </li>
                        <li>
                          <label for="event-end">
                            <i
                              className="fa fa-bell-slash"
                              aria-hidden="true"
                            ></i>
                            To
                          </label>
                          <input
                            id="event-end"
                            className="form-control"
                            type="datetime-local"
                            name="end"
                          />
                        </li>
                        <li>
                          <label for="event-title">
                            <i
                              className="fa fa-calendar-minus-o"
                              aria-hidden="true"
                            ></i>
                            Event Name
                          </label>
                          <input
                            id="event-title"
                            className="form-control"
                            type="text"
                            name="title"
                          />
                        </li>
                        <li>
                          <label for="event-location">
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                            Location
                          </label>
                          <input
                            id="event-location"
                            className="form-control"
                            type="text"
                            name="location"
                          />
                        </li>
                        <li>
                          <label for="event-details">
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            ></i>
                            Description
                          </label>
                          <textarea
                            id="event-details"
                            className="form-control"
                            name="details"
                          ></textarea>
                        </li>
                        <div className="button">
                          <input
                            type="submit"
                            className="form-control submit_btn"
                          />
                        </div>
                      </ul>
                    </form>

                    <div id="event">
                      <header></header>
                      <ul>
                        <li className="start-time">
                          <p>Start at</p>
                          <time></time>
                        </li>
                        <li className="end-time">
                          <p>End</p>
                          <time></time>
                        </li>
                        <li>
                          <p>
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                            Location
                          </p>
                          <p className="location"></p>
                        </li>
                        <li>
                          <p>
                            <i className="fa fa-info" aria-hidden="true"></i>
                            Details:
                          </p>
                          <p className="details"></p>
                        </li>
                      </ul>
                    </div>

                    <div className="prong">
                      <div className="bottom-prong-dk"></div>
                      <div className="bottom-prong-lt"></div>
                    </div>
                  </div>

                  <div className="modle" id="simplemodal">
                    <div className="modle-continer">
                      <form id="edit-form">
                        <div className="modal-header">
                          <span className="close-btn" id="close-btnid">
                            &times
                          </span>
                          <h2>Edit Event</h2>
                        </div>
                        <div className="modal-body">
                          <lable for="eventname">Event Name</lable>
                          <input
                            type="text"
                            name="eventname"
                            id="eventname"
                            className="form-control"
                          />
                          <lable for="location">Location</lable>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            className="form-control"
                          />

                          <label for="event-start">From</label>
                          <input
                            id="eventstart"
                            type="datetime-local"
                            name="start"
                            className="form-control"
                          />

                          <label for="event-end">To</label>
                          <input
                            id="eventend"
                            type="datetime-local"
                            name="end"
                            className="form-control"
                          />
                          <label for="event-details">Details</label>
                          <textarea
                            id="eventdetails"
                            type="text"
                            name="details"
                            className="form-control"
                          ></textarea>
                        </div>
                        <div className="modal-footer">
                          <button type="submit" className="btn btn-info">
                            save
                          </button>
                          <button className="btn btn-dafault">cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div id="search_result">result</div>
                  {/* <button className='btn btn-primary'>Add Events</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Availability;
