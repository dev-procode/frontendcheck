import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGarage } from "../../../Redux/garageSlice";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Garages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.garage);
  const operator_cognito_id = localStorage.getItem("cognito_id");
  console.log("state", state);
  useEffect(() => {
    dispatch(fetchGarage(operator_cognito_id));
  }, []);

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
                  <h4>Garages</h4>
                  <div>
                    <button
                      class="commonButton"
                      onClick={() => navigate("/operator/garages/addGarages")}
                    >
                      Add New
                    </button>
                    &nbsp;&nbsp;
                    {/* <button class="commonButton">
                      <i class="fa-solid fa-bars-filter"></i> Filter
                    </button> */}
                  </div>
                </div>
                <div class="markTab">
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="new"
                      aria-labelledby="new-tab"
                    >
                      <div class="table-responsive marketTable">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Address</th>
                              <th scope="col">City</th>
                              <th scope="col">State</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {state.isLoading ? (
                              <div className="loader">
                                <RotatingLines
                                  strokeColor="black"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="96"
                                  visible={state.isLoading}
                                />
                              </div>
                            ) : state?.data.length != 0 ? (
                              state?.data.map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{data?.Garage?.garage_name}</td>
                                    <td>{data?.Garage?.garage_address}</td>
                                    <td>{data?.Garage?.garage_city}</td>
                                    <td>{data?.Garage?.garage_state}</td>
                                    <td
                                      onClick={() =>
                                        navigate(
                                          `details/?id=${data?.Garage?.garage_id}`
                                        )
                                      }
                                    >
                                      <a href="">Details</a>{" "}
                                      <span class="dots">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colspan="8">
                                  <div class="nodata">No Garage Added</div>
                                </td>
                              </tr>
                            )}
                            {/* <tr>
                              <td>Yard Garage</td>
                              <td>3230 Oxon Hill RD</td>
                              <td>Oxon Hill, MD</td>
                              <td>4</td>
                              <td>
                                <a href="">Details</a>{" "}
                                <span class="dots">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Yard Garage</td>
                              <td>3230 Oxon Hill RD</td>
                              <td>Oxon Hill, MD</td>
                              <td>4</td>
                              <td>
                                <a href="">Details</a>{" "}
                                <span class="dots">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Yard Garage</td>
                              <td>3230 Oxon Hill RD</td>
                              <td>Oxon Hill, MD</td>
                              <td>4</td>
                              <td>
                                <a href="">Details</a>{" "}
                                <span class="dots">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Yard Garage</td>
                              <td>3230 Oxon Hill RD</td>
                              <td>Oxon Hill, MD</td>
                              <td>4</td>
                              <td>
                                <a href="">Details</a>{" "}
                                <span class="dots">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </span>
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="ending"
                      aria-labelledby="ending-tab"
                    >
                      ..2.
                    </div>
                    <div
                      class="tab-pane fade"
                      id="picking"
                      aria-labelledby="picking-tab"
                    >
                      ..3.
                    </div>
                    <div
                      class="tab-pane fade"
                      id="all"
                      aria-labelledby="all-tab"
                    >
                      ..4.
                    </div>
                  </div>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Garages;
