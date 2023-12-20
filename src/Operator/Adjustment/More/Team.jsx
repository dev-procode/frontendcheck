import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../../../Redux/teamSlice";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate, Link } from "react-router-dom";

const Team = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.team);
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const getTeamData = async () => {
    dispatch(fetchTeam(operator_cognito_id));
  };
  useEffect(() => {
    getTeamData();
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
                  <h4>Team</h4>
                  <div>
                    <button
                      class="commonButton"
                      onClick={() => navigate("/operator/team/teamuser")}
                    >
                      Add New
                    </button>
                    &nbsp;&nbsp;
                    {/* <button class="commonButton"><i class="fa-solid fa-bars-filter"></i> Filter</button> */}
                  </div>
                </div>
                <div class="markTab">
                  <div class="tabTop">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="new-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#new"
                          type="button"
                          aria-selected="true"
                        >
                          All
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="ending-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#ending"
                          type="button"
                          aria-selected="false"
                        >
                          Driver
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="new"
                      aria-labelledby="new-tab"
                    >
                      <div class="table-responsive marketTable teamtable">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Type</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {state?.data.length !== 0
                              ? state?.data.map((data, i) => (
                                  <tr>
                                    <td>{`${data.OperatorTeam.operatorteam_firstname} ${data.OperatorTeam.operatorteam_lastname}`}</td>
                                    <td>
                                      <span>
                                        {data.OperatorTeam.operatorteam_email}
                                      </span>
                                    </td>
                                    <td>
                                      {
                                        data.OperatorTeamType
                                          .operatorteamtype_name
                                      }
                                    </td>
                                    <td>
                                      <Link
                                        to={`details/?id=${data.OperatorTeam.operatorteam_id}`}
                                      >
                                        Details
                                      </Link>
                                      <span class="dots">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              : "No Team Found"}
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
                  </div>
                </div>

                {/* <div class="paginationBg">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
