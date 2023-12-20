import React from 'react'
import HeaderSecond from '../../../Common/HeaderSecond'
import Sidebar from '../../Sidebar/Sidebar'

const Marketplace = () => {
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
                            <h4>Marketplace</h4>
                            <button class="commonButton"><i class="fa-solid fa-bars-filter"></i> Filter</button>
                        </div>
                        <div class="markTab">
                        <div class="tabTop">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                              <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="new-tab" data-bs-toggle="tab" data-bs-target="#new" type="button" aria-selected="true">New</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="ending-tab" data-bs-toggle="tab" data-bs-target="#ending" type="button" aria-selected="false">Ending Soon</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="picking-tab" data-bs-toggle="tab" data-bs-target="#picking" type="button" aria-selected="false">Picking Up Soonest</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" aria-selected="false">All</button>
                              </li>
                            </ul>
                        {/* <button class="commonButton"><i class="fa-solid fa-bars-filter"></i> Filter</button> */}
                        </div>
                        <div class="tab-content" id="myTabContent">
                          <div class="tab-pane fade show active" id="new" aria-labelledby="new-tab">
                              <div class="table-responsive marketTable">
                                  <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Pickup/Destination</th>
                                      <th scope="col">Pickup Date</th>
                                      <th scope="col">Vehicles</th>
                                      <th scope="col">Drivers</th>
                                      <th scope="col">Expiration</th>
                                      <th scope="col">Bid Price</th>
                                      <th scope="col">&nbsp;</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>1 Charter Bus</td>
                                      <td>1</td>
                                      <td>4d 19h 13m</td>
                                      <td>$6732.00</td>
                                      <td><a href="/map2">Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>1 Charter Bus</td>
                                      <td>1</td>
                                      <td>4d 19h 13m</td>
                                      <td>$6732.00</td>
                                      <td><a href="/map2">Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>1 Charter Bus</td>
                                      <td>1</td>
                                      <td>4d 19h 13m</td>
                                      <td>$6732.00</td>
                                      <td><a href="/map2">Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>1 Charter Bus</td>
                                      <td>1</td>
                                      <td>4d 19h 13m</td>
                                      <td>$6732.00</td>
                                      <td><a href="/map2">Details</a></td>
                                    </tr>
                                      <tr>
                                      <td>{`Washington > Philadelphia`}</td>
                                      <td>Apr 17, 2023 6:00 am, EDT</td>
                                      <td>1 Charter Bus</td>
                                      <td>1</td>
                                      <td>4d 19h 13m</td>
                                      <td>$6732.00</td>
                                      <td><a href="/map2">Details</a></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                          </div>
                          <div class="tab-pane fade" id="ending" aria-labelledby="ending-tab">..2.</div>
                          <div class="tab-pane fade" id="picking" aria-labelledby="picking-tab">..3.</div>
                          <div class="tab-pane fade" id="all" aria-labelledby="all-tab">..4.</div>
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

export default Marketplace
