import React from 'react'
import HeaderSecond from '../../../Common/HeaderSecond'
import Sidebar from '../../Sidebar/Sidebar'
import bus from '../../../assets/images/bus.png'
import driver from '../../../assets/images/driver.png'
import driverh from '../../../assets/images/driverh.png'
import bush from '../../../assets/images/bush.png'

const Upcoming = () => {
  return (
    <div>
        <HeaderSecond />
        <section class="">
        <div class="container">
            <div class="row">
                <Sidebar/>
                <div class="col-lg-9">
                    <div class="dbRgt">
                        <div class="bookinghdn">
                            <h4>Upcoming</h4>
                         <a href="">All your booking (333)</a>
                            <button class="commonButton"><i class="fa-solid fa-bars-filter"></i> Filter</button>
                        </div>
                        <div class="markTab">
                        <div class="tabTop">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="opportunities-tab" data-bs-toggle="tab" data-bs-target="#opportunities" type="button" aria-selected="false">Opportunities<span class="markCircle"></span></button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="nxt-tab" data-bs-toggle="tab" data-bs-target="#nxt" type="button" aria-selected="false">Next 7 Days</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="uc-tab" data-bs-toggle="tab" data-bs-target="#uc" type="button" aria-selected="true">Up Coming</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="progress-tab" data-bs-toggle="tab" data-bs-target="#progress" type="button" aria-selected="false">In Progress</button>
                              </li>
                                <li class="nav-item" role="presentation">
                                <button class="nav-link" id="finished-tab" data-bs-toggle="tab" data-bs-target="#finished" type="button" aria-selected="false">Finished</button>
                              </li>
                                <li class="nav-item" role="presentation">
                                <button class="nav-link" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" aria-selected="false">All</button>
                              </li>
                            </ul>
                           {/* <button class="commonButton"><i class="fa-solid fa-bars-filter"></i> Filter</button> */}
                        </div>
                        <div class="tab-content" id="myTabContent">
                          <div class="tab-pane fade" id="opportunities" aria-labelledby="opportunities-tab">
                              111
                          </div>
                          <div class="tab-pane fade" id="nxt" aria-labelledby="nxt-tab">..2.</div>
                          <div class="tab-pane fade show active" id="uc" aria-labelledby="uc-tab">
                              <div class="table-responsive marketTable">
                                  <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Id</th>
                                      <th scope="col">Pickup/Destination</th>
                                      <th scope="col">Pickup Date</th>
                                      <th scope="col">Price</th>
                                      <th scope="col">Vehicles</th>
                                      <th scope="col">Drivers</th>
                                      <th scope="col">&nbsp;</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>637743</td>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>$6732.00</td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc"><img src={bus} alt=""/></span>
                                            <span class="bcc1"><img src={bus} alt=""/></span>
                                            <span class="bcc2"><img src={bus} alt=""/></span>
                                        </div>
                                      </td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc"><img src={driver} alt=""/></span>
                                            <span class="bcc1"><img src={driver} alt=""/></span>
                                            <span class="bcc2"><img src={driver} alt=""/></span>
                                        </div>
                                      </td>
                                      <td><a href="">&nbsp;&nbsp;Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>637743</td>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>$6732.00</td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={bush} alt=""/></span>
                                            <span class="bcc1 active"><img src={bush} alt=""/></span>
                                        </div>
                                      </td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={driverh} alt=""/></span>
                                            <span class="bcc1 active"><img src={driverh} alt=""/></span>
                                        </div>
                                      </td>
                                      <td><a href="">&nbsp;&nbsp;Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>637743</td>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>$6732.00</td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={bush} alt=""/></span>
                                        </div>
                                      </td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={driverh} alt=""/></span>
                                        </div>
                                      </td>
                                      <td><a href="">&nbsp;&nbsp;Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>637743</td>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>$6732.00</td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={bush} alt=""/></span>
                                        </div>
                                      </td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={driverh} alt=""/></span>
                                        </div>
                                      </td>
                                      <td><a href="">&nbsp;&nbsp;Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>637743</td>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>$6732.00</td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={bush} alt=""/></span>
                                        </div>
                                      </td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={driverh} alt=""/></span>
                                        </div>
                                      </td>
                                      <td><a href="">&nbsp;&nbsp;Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>637743</td>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>$6732.00</td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={bush} alt=""/></span>
                                        </div>
                                      </td>
                                      <td>
                                          <div class="bookcarslot usvehicle">
                                            <span class="bcc active"><img src={driverh} alt=""/></span>
                                        </div>
                                      </td>
                                      <td><a href="">&nbsp;&nbsp;Details</a></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                          </div>
                          <div class="tab-pane fade" id="progress" aria-labelledby="progress-tab">..4.</div>
                          <div class="tab-pane fade" id="finished" aria-labelledby="finished-tab">..5.</div>
                          <div class="tab-pane fade" id="all" aria-labelledby="all-tab">.6.</div>
                        </div>
                    </div>
                    </div>  
                </div>
            </div>
        </div>
    </section>
      
    </div>
  )
}

export default Upcoming
