import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicle } from "../../../Redux/vehicleslice";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { addRates, getRateVehicle } from "../../../Service/apis";
import { RotatingLines } from "react-loader-spinner";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

const Vehicles = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.vehicle);
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const [show, setShow] = useState(false);
  const [vehicleIdData, setVehicleIdData] = useState([]);
  const [vehicleId, setVehicleId] = useState();
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  useEffect(() => {
    allVehicle();
  }, []);
  const allVehicle = () => {
    dispatch(fetchVehicle(operator_cognito_id));
  };
  const formik = useFormik({
    initialValues: {
      operatorrate_transfer_rate: "",
      operatorrate_dead_mile_rate: "",
      operatorrate_live_mile_rate: "",
      operatorrate_hourly_rate: "",
      operatorrate_hour_min_rate: "",
      operatorrate_daily_rate: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: yup.object().shape({
      operatorrate_transfer_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Transfer name is required"),
      operatorrate_dead_mile_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Dead mile is required"),
      operatorrate_live_mile_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Live mile is required"),
      operatorrate_hourly_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Hourly is required"),
      operatorrate_hour_min_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Hr min is required"),
      operatorrate_daily_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Daily is required"),
    }),
  });
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  const handleSubmit1 = async () => {
    const data = {
      operator_cognito_id: operator_cognito_id,
      operatorrate_vehicle_id: vehicleId,
      operatorrate_transfer_rate: Number(
        formik.values.operatorrate_transfer_rate
      ),
      operatorrate_dead_mile_rate: Number(
        formik.values.operatorrate_dead_mile_rate
      ),
      operatorrate_live_mile_rate: Number(
        formik.values.operatorrate_live_mile_rate
      ),
      operatorrate_hourly_rate: Number(formik.values.operatorrate_hourly_rate),
      operatorrate_hour_min_rate: Number(
        formik.values.operatorrate_hour_min_rate
      ),
      operatorrate_daily_rate: Number(formik.values.operatorrate_daily_rate),
    };
    const response = await addRates(data);
    console.log("response", response);
    if (response.status === 200) {
      navigate("/operator/rates");
    }
    handleClose();
  };
  const getratesVechiclelist = async () => {
    const response = await getRateVehicle(operator_cognito_id);
    if (response.data) {
      const vehicleIdArray = response.data.map(
        (obj) => obj?.OperatorRate?.operatorrate_vehicle_id
      );
      setVehicleIdData(vehicleIdArray);
    }
  };
  useEffect(() => {
    getratesVechiclelist();
  }, []);
  const handleSetRates = (id) => {
    setVehicleId(id);
    setShow(true);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Rates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <label>Transfer rate</label>
              <input
                type="number"
                name="operatorrate_transfer_rate"
                value={formik.values.operatorrate_transfer_rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.touched.operatorrate_transfer_rate &&
                formik.errors.operatorrate_transfer_rate && (
                  <div style={{ color: "red" }}>
                    {formik.errors.operatorrate_transfer_rate}
                  </div>
                )}
            </div>
            <div className="col-md-12">
              <label>Dead Mile</label>
              <input
                type="number"
                name="operatorrate_dead_mile_rate"
                value={formik.values.operatorrate_dead_mile_rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.touched.operatorrate_dead_mile_rate &&
                formik.errors.operatorrate_dead_mile_rate && (
                  <div style={{ color: "red" }}>
                    {formik.errors.operatorrate_dead_mile_rate}
                  </div>
                )}
            </div>
            <div className="col-md-12">
              <label>Live Mile</label>
              <input
                type="number"
                name="operatorrate_live_mile_rate"
                value={formik.values.operatorrate_live_mile_rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.touched.operatorrate_live_mile_rate &&
                formik.errors.operatorrate_live_mile_rate && (
                  <div style={{ color: "red" }}>
                    {formik.errors.operatorrate_live_mile_rate}
                  </div>
                )}
            </div>
            <div className="col-md-12">
              <label>Hourly</label>
              <input
                type="number"
                name="operatorrate_hourly_rate"
                value={formik.values.operatorrate_hourly_rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.touched.operatorrate_hourly_rate &&
                formik.errors.operatorrate_hourly_rate && (
                  <div style={{ color: "red" }}>
                    {formik.errors.operatorrate_hourly_rate}
                  </div>
                )}
            </div>
            <div className="col-md-12">
              <label>Hr.Min</label>
              <input
                type="number"
                name="operatorrate_hour_min_rate"
                value={formik.values.operatorrate_hour_min_rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.touched.operatorrate_hour_min_rate &&
                formik.errors.operatorrate_hour_min_rate && (
                  <div style={{ color: "red" }}>
                    {formik.errors.operatorrate_hour_min_rate}
                  </div>
                )}
            </div>
            <div className="col-md-12">
              <label>Daily</label>
              <input
                type="number"
                name="operatorrate_daily_rate"
                value={formik.values.operatorrate_daily_rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.touched.operatorrate_daily_rate &&
                formik.errors.operatorrate_daily_rate && (
                  <div style={{ color: "red" }}>
                    {formik.errors.operatorrate_daily_rate}
                  </div>
                )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit1}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <HeaderSecond />
      <section class="">
        <div class="container">
          <div class="row">
            <Sidebar />

            <div class="col-lg-9">
              <div class="dbRgt">
                <div class="bookinghdn">
                  <h4>Vehicles</h4>
                  <div>
                    <button
                      class="commonButton"
                      onClick={() => navigate("/operator/vehicles/addVehicle")}
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
                              <th scope="col">Type</th>
                              <th scope="col">License</th>
                              {/* <th scope="col">Average</th> */}
                              <th scope="col">Make</th>
                              <th scope="col">&nbsp;</th>
                              <th scope="col">&nbsp;</th>
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
                              state?.data.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{data?.Vehicle?.vehicle_name}</td>
                                    <td>
                                      {data?.VehicleType?.vehicletype_name}
                                    </td>
                                    <td>
                                      {data?.Vehicle?.vehicle_license_plate}
                                    </td>
                                    {/* <td>&nbsp;</td> */}
                                    <td>{data?.Vehicle?.vehicle_make}</td>
                                    <td>
                                      <Link
                                        to={`vehicledetails/?id=${data?.Vehicle?.vehicle_id}`}
                                      >
                                        Details
                                      </Link>
                                      <span class="dots">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                      </span>
                                    </td>
                                    <td>
                                      {vehicleIdData.includes(
                                        data?.Vehicle?.vehicle_id
                                      ) ? (
                                        <button
                                          className="setshowdisable"
                                          disabled
                                        >
                                          Rates allready set
                                        </button>
                                      ) : (
                                        <button
                                          className="setshow"
                                          onClick={() =>
                                            handleSetRates(
                                              data?.Vehicle?.vehicle_id
                                            )
                                          }
                                        >
                                          Set Rates
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colspan="8">
                                  <div class="nodata">No Vehicle Added</div>
                                </td>
                              </tr>
                            )}

                            {/* <tr>
                                      <td>Default1</td>
                                      <td>Charter Bus</td>
                                      <td>461S7B</td>
                                      <td>&nbsp;</td>
                                      <td>4d 19h 13m</td>                                      
                                      <td><a href="">Details</a> <span class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></span></td>
                                    </tr>
                                      <tr>
                                      <td>Default1</td>
                                      <td>Charter Bus</td>
                                      <td>461S7B</td>
                                      <td>&nbsp;</td>
                                      <td>4d 19h 13m</td>                                      
                                      <td><a href="">Details</a> <span class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></span></td>
                                    </tr>
                                      <tr>
                                      <td>Default1</td>
                                      <td>Charter Bus</td>
                                      <td>461S7B</td>
                                      <td>&nbsp;</td>
                                      <td>4d 19h 13m</td>                                      
                                      <td><a href="">Details</a> <span class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></span></td>
                                    </tr>
                                      <tr>
                                      <td>Default1</td>
                                      <td>Charter Bus</td>
                                      <td>461S7B</td>
                                      <td>&nbsp;</td>
                                      <td>4d 19h 13m</td>                                      
                                      <td><a href="">Details</a> <span class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></span></td>
                                    </tr>
                                      <tr>
                                      <td>Default1</td>
                                      <td>Charter Bus</td>
                                      <td>461S7B</td>
                                      <td>&nbsp;</td>
                                      <td>4d 19h 13m</td>                                      
                                      <td><a href="">Details</a> <span class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></span></td>
                                    </tr>
                                      <tr>
                                      <td>Default1</td>
                                      <td>Charter Bus</td>
                                      <td>461S7B</td>
                                      <td>&nbsp;</td>
                                      <td>4d 19h 13m</td>                                      
                                      <td><a href="">Details</a> <span class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></span></td>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vehicles;
