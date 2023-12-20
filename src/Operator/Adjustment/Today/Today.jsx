import React from "react";

import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import Card from "./Card";

const Today = () => {
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
                  <h4>Your Booking</h4>
                  <a href="">All your booking (333)</a>
                </div>
                <div class="markTab">
                  <div class="tabTop">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="tb1"
                          data-bs-toggle="tab"
                          data-bs-target="#tba"
                          type="button"
                          aria-selected="true"
                        >
                          Starting Soon (1)
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="tb2"
                          data-bs-toggle="tab"
                          data-bs-target="#tbb"
                          type="button"
                          aria-selected="false"
                        >
                          Booked Today (4)
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="tb3"
                          data-bs-toggle="tab"
                          data-bs-target="#tbc"
                          type="button"
                          aria-selected="false"
                        >
                          Needs Acceptance(0)
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="tb4"
                          data-bs-toggle="tab"
                          data-bs-target="#tbd"
                          type="button"
                          aria-selected="false"
                        >
                          Needs Assignment(9)
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="tba"
                      aria-labelledby="tb1"
                    >
                      <div class="todaybg">
                        <Card />
                      </div>
                    </div>
                    <div class="tab-pane fade" id="tbb" aria-labelledby="tb2">
                      <div class="todaybg">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                      </div>
                      <div class="paginationBg">
                        <ul class="pagination">
                          <li class="page-item disabled">
                            <a
                              class="page-link"
                              href="#"
                              tabindex="-1"
                              aria-disabled="true"
                            >
                              <i class="fa-solid fa-chevrons-left"></i>
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">
                              <i class="fa-solid fa-chevrons-right"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="tbc" aria-labelledby="tb3">
                      ..3.
                    </div>
                    <div class="tab-pane fade" id="tbd" aria-labelledby="tb4">
                      ..4.
                    </div>
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

export default Today;
