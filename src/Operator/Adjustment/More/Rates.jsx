import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRate,
  fetchAdjustment,
  addAdjustment,
  vehicleRate,
  specificAdjustmentData,
  specificRates,
  updateAdjusment,
  updateRatesData,
} from "../../../Redux/rateSlice";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { updateSpecificRates } from "../../../Service/apis";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

const Rates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.rate);
  const location = useLocation();
  const operator_cognito_id = localStorage.getItem("cognito_id");
  // const [tabid, setTabid] = useState(location.state?.active || "tb1");
  const [tabid, setTabid] = useState("tb1");
  const [vehicleId, setVehicleId] = useState("");
  const [opRates, setOPRate] = useState();
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);
  const handleClose = () => setShow(false);
  const [rateId, setId] = useState();
  const [editId, setEditId] = useState();
  const [editModal, setEditModal] = useState(false);
  const handleEditClose = () => setEditModal(false);
  const [formValue, setFormValue] = useState({
    operatorrate_transfer_rate: "",
    operatorrate_dead_mile_rate: "",
    operatorrate_live_mile_rate: "",
    operatorrate_hourly_rate: "",
    operatorrate_hour_min_rate: "",
    operatorrate_daily_rate: "",
  });
  const [adjustmentFormvalue, setAdjustmentFormValue] = useState({
    operatoradjustment_name: "",
    operatoradjustment_transfer_rate: 0,
    operatoradjustment_dead_mile_rate: 0,
    operatoradjustment_live_mile_rate: 0,
    operatoradjustment_hourly_rate: 0,
    operatoradjustment_hour_min_rate: 0,
    operatoradjustment_daily_rate: 0,
    operatoradjustment_start_date: "",
    operatoradjustment_end_date: "",
  });
  const formik = useFormik({
    initialValues: {
      operatoradjustment_name: "",
      operatoradjustment_transfer_rate: "",
      operatoradjustment_dead_mile_rate: "",
      operatoradjustment_live_mile_rate: "",
      operatoradjustment_hourly_rate: "",
      operatoradjustment_hour_min_rate: "",
      operatoradjustment_daily_rate: "",
      operatoradjustment_start_date: new Date(),
      operatoradjustment_end_date: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: yup.object().shape({
      operatoradjustment_name: yup.string().required("Name is required"),
      operatoradjustment_transfer_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Transfer rate is required"),
      operatoradjustment_dead_mile_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Dead mile is required"),
      operatoradjustment_live_mile_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Live mile is required"),
      operatoradjustment_hourly_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Hourly is required"),
      operatoradjustment_hour_min_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Hr min is required"),
      operatoradjustment_daily_rate: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Daily is required"),
      operatoradjustment_start_date: yup
        .date()
        .required("Start date is required"),
      operatoradjustment_end_date: yup
        .date()
        .required("end date is required")
        .when("operatoradjustment_start_date", (startDate, schema) => {
          return startDate
            ? schema.min(startDate, "End date must be greater than start date")
            : schema;
        }),
    }),
  });
  const handleSubmit = async (values) => {
    const data = {
      operator_cognito_id: operator_cognito_id,
      operatoradjustment_vehicle_id: vehicleId,
      operatoradjustment_operatorrate_id: opRates.operatorrate_id,
      operatoradjustment_name: values.operatoradjustment_name,
      operatoradjustment_transfer_rate: values.operatoradjustment_transfer_rate,
      operatoradjustment_dead_mile_rate:
        values.operatoradjustment_dead_mile_rate,
      operatoradjustment_live_mile_rate:
        values.operatoradjustment_live_mile_rate,
      operatoradjustment_hourly_rate: values.operatoradjustment_hourly_rate,
      operatoradjustment_hour_min_rate: values.operatoradjustment_hour_min_rate,
      operatoradjustment_daily_rate: values.operatoradjustment_daily_rate,
      operatoradjustment_start_date: values.operatoradjustment_start_date,
      operatoradjustment_end_date: values.operatoradjustment_end_date,
    };
    dispatch(addAdjustment(data));
  };
  const getRatesData = async () => {
    dispatch(fetchRate(operator_cognito_id));
  };
  useEffect(() => {
    getRatesData();
  }, []);
  const handleEdit = async (id) => {
    const data = {
      operator_cognito_id,
      id,
    };
    dispatch(specificRates(data));
    setId(id);

    setShow(true);
  };
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const updateRates = async () => {
    const data = formValue;
    Object.keys(data).forEach((key) => {
      if (data[key] === state?.specificRateData[key]) {
        delete data[key];
      }
    });
    const params = {
      data,
      operator_cognito_id,
      rateId,
    };
    dispatch(updateRatesData(params));
  };
  const handleUpdate = () => {
    updateRates();
    handleClose();
    getRatesData();
  };
  const getratesVechiclelist = async () => {
    dispatch(vehicleRate(operator_cognito_id));
  };
  useEffect(() => {
    getratesVechiclelist();
  }, []);
  const handleChangeSelect = (event) => {
    const { Vehicle, OperatorRate } = JSON.parse(event.target.value);
    console.log("event", JSON.parse(event.target.value));
    setVehicleId(Vehicle.vehicle_id);
    setOPRate(OperatorRate);
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getAdjustmentData = async () => {
    dispatch(fetchAdjustment(operator_cognito_id));
  };
  useEffect(() => {
    getAdjustmentData();
  }, []);
  const handleEditAdjustment = (id) => {
    setEditId(id);
  };
  const updateAdjustment = async () => {
    const data = adjustmentFormvalue;
    Object.keys(data).forEach((key) => {
      if (data[key] === state?.specificAdjustData[key]) {
        delete data[key];
      }
    });
    const params = {
      data,
      operator_cognito_id,
      editId,
    };
    dispatch(updateAdjusment(params));
  };
  const handleUpdateAdjustment = () => {
    updateAdjustment();
    setEditModal(false);
    getAdjustmentData();
  };
  const handleChangeAdjustmentInput = (event) => {
    const { name, value } = event.target;
    setAdjustmentFormValue({
      ...adjustmentFormvalue,
      [name]: value,
    });
  };
  const getSpecificAdjusment = async () => {
    const data = {
      operator_cognito_id,
      editId,
    };
    dispatch(specificAdjustmentData(data));
    setEditModal(true);
  };
  useEffect(() => {
    if (editId) {
      getSpecificAdjusment();
    }
  }, [editId]);
  useEffect(() => {
    setAdjustmentFormValue({
      ...adjustmentFormvalue,
      operatoradjustment_name:
        state?.specificAdjustData?.operatoradjustment_name,
      operatoradjustment_transfer_rate:
        state?.specificAdjustData?.operatoradjustment_transfer_rate,
      operatoradjustment_dead_mile_rate:
        state?.specificAdjustData?.operatoradjustment_dead_mile_rate,
      operatoradjustment_live_mile_rate:
        state?.specificAdjustData?.operatoradjustment_live_mile_rate,
      operatoradjustment_hourly_rate:
        state?.specificAdjustData?.operatoradjustment_hourly_rate,
      operatoradjustment_hour_min_rate:
        state?.specificAdjustData?.operatoradjustment_hour_min_rate,
      operatoradjustment_daily_rate:
        state?.specificAdjustData?.operatoradjustment_daily_rate,
      operatoradjustment_start_date:
        state?.specificAdjustData?.operatoradjustment_start_date,
      operatoradjustment_end_date:
        state?.specificAdjustData?.operatoradjustment_end_date,
    });
  }, [state]);
  useEffect(() => {
    setFormValue({
      ...formValue,
      operatorrate_transfer_rate:
        state?.specificRateData?.operatorrate_transfer_rate,
      operatorrate_dead_mile_rate:
        state?.specificRateData?.operatorrate_dead_mile_rate,
      operatorrate_live_mile_rate:
        state?.specificRateData?.operatorrate_live_mile_rate,
      operatorrate_hourly_rate:
        state?.specificRateData?.operatorrate_hourly_rate,
      operatorrate_hour_min_rate:
        state?.specificRateData?.operatorrate_hour_min_rate,
      operatorrate_daily_rate: state?.specificRateData?.operatorrate_daily_rate,
    });
  }, [state]);
  return (
    <div>
      <Modal show={editModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title> Edit Adjustment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <label>Adjustment name</label>
              <input
                type="text"
                name="operatoradjustment_name"
                value={adjustmentFormvalue.operatoradjustment_name}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Transfer rate</label>
              <input
                type="number"
                name="operatorrate_transfer_rate"
                value={adjustmentFormvalue.operatoradjustment_transfer_rate}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Dead Mile</label>
              <input
                type="number"
                name="operatoradjustment_dead_mile_rate"
                value={adjustmentFormvalue.operatoradjustment_dead_mile_rate}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Live Mile</label>
              <input
                type="number"
                name="operatoradjustment_live_mile_rate"
                value={adjustmentFormvalue.operatoradjustment_live_mile_rate}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Hourly</label>
              <input
                type="number"
                name="operatoradjustment_hourly_rate"
                value={adjustmentFormvalue.operatoradjustment_hourly_rate}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Hr.Min</label>
              <input
                type="number"
                name="operatoradjustment_hour_min_rate"
                value={adjustmentFormvalue.operatoradjustment_hour_min_rate}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Daily</label>
              <input
                type="number"
                name="operatoradjustment_daily_rate"
                value={adjustmentFormvalue.operatoradjustment_daily_rate}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Start Date</label>
              <input
                type="date"
                name="operatoradjustment_start_date"
                value={adjustmentFormvalue.operatoradjustment_start_date}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>End Date</label>
              <input
                type="date"
                name="operatoradjustment_end_date"
                value={adjustmentFormvalue.operatoradjustment_end_date}
                onChange={handleChangeAdjustmentInput}
                className="form-control"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateAdjustment}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Edit Rates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <label>Transfer rate</label>
              <input
                type="number"
                name="operatorrate_transfer_rate"
                value={formValue.operatorrate_transfer_rate}
                onChange={handleChangeInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Dead Mile</label>
              <input
                type="number"
                name="operatorrate_dead_mile_rate"
                value={formValue.operatorrate_dead_mile_rate}
                onChange={handleChangeInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Live Mile</label>
              <input
                type="number"
                name="operatorrate_live_mile_rate"
                value={formValue.operatorrate_live_mile_rate}
                onChange={handleChangeInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Hourly</label>
              <input
                type="number"
                name="operatorrate_hourly_rate"
                value={formValue.operatorrate_hourly_rate}
                onChange={handleChangeInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Hr.Min</label>
              <input
                type="number"
                name="operatorrate_hour_min_rate"
                value={formValue.operatorrate_hour_min_rate}
                onChange={handleChangeInput}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label>Daily</label>
              <input
                type="number"
                name="operatorrate_daily_rate"
                value={formValue.operatorrate_daily_rate}
                onChange={handleChangeInput}
                className="form-control"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <HeaderSecond />
      <section className="">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-lg-9">
              <div className="dbRgt">
                <div class="bookinghdn">
                  <h4>Rates</h4>
                  <div>
                    {tabid === "tb2" && state?.vehiclerate.length != 0 && (
                      <button
                        class="commonButton"
                        onClick={() => setToggle(!toggle)}
                      >
                        Add Adjusment
                      </button>
                    )}

                    {/* &nbsp;&nbsp;
                    {tabid != "tb1" && (
                      <button class="commonButton">
                        <i class="fa-solid fa-bars-filter"></i> Filter
                      </button>
                    )} */}
                  </div>
                </div>
                <div className="markTab">
                  <div className="tabTop">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class={`nav-link ${tabid === "tb1" ? "active" : ""}`}
                          id="tb1"
                          data-bs-toggle="tab"
                          data-bs-target="#tba"
                          type="button"
                          aria-selected="true"
                          onClick={() => setTabid("tb1")}
                        >
                          Rates
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class={`nav-link ${tabid === "tb2" ? "active" : ""}`}
                          id="tb2"
                          data-bs-toggle="tab"
                          data-bs-target="#tbb"
                          type="button"
                          aria-selected="false"
                          onClick={() => setTabid("tb2")}
                        >
                          Adjustment
                        </button>
                      </li>
                      {/* <li class="nav-item" role="presentation">
                        <button
                          class={`nav-link ${tabid === "tb3" ? "active" : ""}`}
                          id="tb3"
                          data-bs-toggle="tab"
                          data-bs-target="#tbc"
                          type="button"
                          aria-selected="false"
                          onClick={() => setTabid("tb3")}
                        >
                          Minimums
                        </button>
                      </li> */}
                    </ul>
                    {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                              <li className="nav-item" role="presentation">
                                <a href="rates.html" className="nav-link active" id="tb1" data-bs-target="#tba" type="button" aria-selected="true">Rates</a>
                              </li>
                              <li className="nav-item" role="presentation">
                                <a href="adjustment.html" className="nav-link" id="tb2" data-bs-target="#tbb" type="button" aria-selected="false">Adjustment</a>
                              </li>
                              <li className="nav-item" role="presentation">
                                <a href="minimum.html" className="nav-link" id="tb3" data-bs-target="#tbc" type="button" aria-selected="false">Minimums</a>
                              </li>
                            </ul> */}
                  </div>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className={`tab-pane fade ${
                        tabid === "tb1" ? "show active" : ""
                      }`}
                      id="tba"
                      aria-labelledby="tb1"
                    >
                      <div className="table-responsive marketTable ratestable">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Type</th>
                              <th scope="col">Transfer</th>
                              <th scope="col">Dead Mile</th>
                              <th scope="col">Live Mile</th>
                              <th scope="col">Hourly</th>
                              <th scope="col">Hr.Min</th>
                              <th scope="col">Daily</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {state?.data.length != 0 ? (
                              state?.data.map((data, i) => (
                                <tr>
                                  <td>{data?.Vehicle?.vehicle_name}</td>
                                  <td>
                                    <input
                                      type="text"
                                      value={
                                        data.OperatorRate
                                          .operatorrate_transfer_rate
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={
                                        data.OperatorRate
                                          .operatorrate_dead_mile_rate
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={
                                        data.OperatorRate
                                          .operatorrate_live_mile_rate
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={
                                        data.OperatorRate
                                          .operatorrate_hourly_rate
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={
                                        data.OperatorRate
                                          .operatorrate_hour_min_rate
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={
                                        data.OperatorRate
                                          .operatorrate_daily_rate
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="setshow"
                                      onClick={() =>
                                        handleEdit(
                                          data.OperatorRate.operatorrate_id
                                        )
                                      }
                                    >
                                      Edit
                                    </button>
                                    {/* <span className="dots">
                                      <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </span> */}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colspan="8">
                                  <div class="nodata">No Rates Found</div>
                                  {/* <div class="nodata">
                                    <Link to="/operator/vehicles">
                                      Click here to add rate
                                    </Link>
                                  </div> */}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        tabid === "tb2" ? "show active" : ""
                      }`}
                      id="tbb"
                      aria-labelledby="tb2"
                    >
                      <div className="table-responsive marketTable ratestable">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Vehicle name</th>
                              <th scope="col">Adjustment name</th>
                              <th scope="col">Transfer rate</th>
                              <th scope="col">Dead mile</th>
                              <th scope="col">Live mile</th>
                              <th scope="col">Hourly</th>
                              <th scope="col">Hr min</th>
                              <th scope="col">Daily</th>
                              <th scope="col">Start date</th>
                              <th scope="col">End date</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {toggle && (
                              <tr>
                                <td>
                                  <select
                                    className="adjustSelectBox"
                                    onChange={(e) => handleChangeSelect(e)}
                                  >
                                    <option>Select</option>
                                    {state?.vehiclerate.length != 0
                                      ? state?.vehiclerate.map((data, i) => (
                                          <option
                                            value={JSON.stringify(data)}
                                            key={i}
                                          >
                                            {data?.Vehicle?.vehicle_name}
                                          </option>
                                        ))
                                      : ""}
                                    <option></option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="operatoradjustment_name"
                                    value={
                                      formik.values.operatoradjustment_name
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                  />

                                  {formik.touched.operatoradjustment_name &&
                                    formik.errors.operatoradjustment_name && (
                                      <div style={{ color: "red" }}>
                                        {formik.errors.operatoradjustment_name}
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="operatoradjustment_transfer_rate"
                                    value={
                                      formik.values
                                        .operatoradjustment_transfer_rate
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                  />
                                  {opRates?.operatorrate_transfer_rate && (
                                    <span>
                                      {" "}
                                      Actual :{" "}
                                      {opRates.operatorrate_transfer_rate}
                                    </span>
                                  )}
                                  {formik.touched
                                    .operatoradjustment_transfer_rate &&
                                    formik.errors
                                      .operatoradjustment_transfer_rate && (
                                      <div style={{ color: "red" }}>
                                        {
                                          formik.errors
                                            .operatoradjustment_transfer_rate
                                        }
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="operatoradjustment_dead_mile_rate"
                                    value={
                                      formik.values
                                        .operatoradjustment_dead_mile_rate
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                  />

                                  {opRates?.operatorrate_dead_mile_rate && (
                                    <span>
                                      {" "}
                                      Actual :{" "}
                                      {opRates.operatorrate_dead_mile_rate}
                                    </span>
                                  )}

                                  {formik.touched
                                    .operatoradjustment_dead_mile_rate &&
                                    formik.errors
                                      .operatoradjustment_dead_mile_rate && (
                                      <div style={{ color: "red" }}>
                                        {
                                          formik.errors
                                            .operatoradjustment_dead_mile_rate
                                        }
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="operatoradjustment_live_mile_rate"
                                    value={
                                      formik.values
                                        .operatoradjustment_live_mile_rate
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                  />
                                  {opRates?.operatorrate_live_mile_rate && (
                                    <span>
                                      {" "}
                                      Actual :{" "}
                                      {opRates.operatorrate_live_mile_rate}
                                    </span>
                                  )}
                                  {formik.touched
                                    .operatoradjustment_live_mile_rate &&
                                    formik.errors
                                      .operatoradjustment_live_mile_rate && (
                                      <div style={{ color: "red" }}>
                                        {
                                          formik.errors
                                            .operatoradjustment_live_mile_rate
                                        }
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="operatoradjustment_hourly_rate"
                                    value={
                                      formik.values
                                        .operatoradjustment_hourly_rate
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                  />
                                  {opRates?.operatorrate_hourly_rate && (
                                    <span>
                                      {" "}
                                      Actual :{" "}
                                      {opRates.operatorrate_hourly_rate}
                                    </span>
                                  )}
                                  {formik.touched
                                    .operatoradjustment_hourly_rate &&
                                    formik.errors
                                      .operatoradjustment_hourly_rate && (
                                      <div style={{ color: "red" }}>
                                        {
                                          formik.errors
                                            .operatoradjustment_hourly_rate
                                        }
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="operatoradjustment_hour_min_rate"
                                    value={
                                      formik.values
                                        .operatoradjustment_hour_min_rate
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                  />
                                  {opRates?.operatorrate_hour_min_rate && (
                                    <span>
                                      {" "}
                                      Actual :{" "}
                                      {opRates.operatorrate_hour_min_rate}
                                    </span>
                                  )}
                                  {formik.touched
                                    .operatoradjustment_hour_min_rate &&
                                    formik.errors
                                      .operatoradjustment_hour_min_rate && (
                                      <div style={{ color: "red" }}>
                                        {
                                          formik.errors
                                            .operatoradjustment_hour_min_rate
                                        }
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="operatoradjustment_daily_rate"
                                    value={
                                      formik.values
                                        .operatoradjustment_daily_rate
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                  />
                                  {opRates?.operatorrate_daily_rate && (
                                    <span>
                                      {" "}
                                      Actual : {opRates.operatorrate_daily_rate}
                                    </span>
                                  )}
                                  {formik.touched
                                    .operatoradjustment_daily_rate &&
                                    formik.errors
                                      .operatoradjustment_daily_rate && (
                                      <div style={{ color: "red" }}>
                                        {
                                          formik.errors
                                            .operatoradjustment_daily_rate
                                        }
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    name="operatoradjustment_start_date"
                                    value={
                                      formik.values
                                        .operatoradjustment_start_date
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                    min={getCurrentDate()}
                                  />
                                  {formik.touched
                                    .operatoradjustment_start_date &&
                                    formik.errors
                                      .operatoradjustment_start_date && (
                                      <div style={{ color: "red" }}>
                                        {
                                          formik.errors
                                            .operatoradjustment_start_date
                                        }
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    name="operatoradjustment_end_date"
                                    value={
                                      formik.values.operatoradjustment_end_date
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="adjustmentInput"
                                    min={getCurrentDate()}
                                  />

                                  {formik.touched.operatoradjustment_end_date &&
                                    formik.errors
                                      .operatoradjustment_end_date && (
                                      <div style={{ color: "red" }}>
                                        {
                                          formik.errors
                                            .operatoradjustment_end_date
                                        }
                                      </div>
                                    )}
                                </td>
                                <td>
                                  <button
                                    className="setshow"
                                    onClick={formik.handleSubmit}
                                  >
                                    Save
                                  </button>
                                </td>
                              </tr>
                            )}

                            {state?.adjustment.length != 0 ? (
                              state?.adjustment.map((data) => (
                                <tr>
                                  <td></td>
                                  <td>
                                    <input
                                      type="text"
                                      name="operatoradjustment_name"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_name
                                      }
                                      readOnly
                                      className="adjustmentInput"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="operatoradjustment_transfer_rate"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_transfer_rate
                                      }
                                      readOnly
                                      className="adjustmentInput"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="operatoradjustment_dead_mile_rate"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_dead_mile_rate
                                      }
                                      readOnly
                                      className="adjustmentInput"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="operatoradjustment_live_mile_rate"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_live_mile_rate
                                      }
                                      readOnly
                                      className="adjustmentInput"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="operatoradjustment_hourly_rate"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_hourly_rate
                                      }
                                      readOnly
                                      className="adjustmentInput"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="operatoradjustment_hour_min_rate"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_hour_min_rate
                                      }
                                      readOnly
                                      className="adjustmentInput"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name="operatoradjustment_daily_rate"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_daily_rate
                                      }
                                      readOnly
                                      className="adjustmentInput"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="date"
                                      name="operatoradjustment_start_date"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_start_date
                                      }
                                      readOnly
                                      className="adjustmentInput"
                                      style={{ width: "120px" }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="date"
                                      name="operatoradjustment_end_date"
                                      value={
                                        data?.OperatorAdjustment
                                          ?.operatoradjustment_end_date
                                      }
                                      readOnly
                                      style={{ width: "120px" }}
                                      className="adjustmentInput"
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="setshow"
                                      onClick={() =>
                                        handleEditAdjustment(
                                          data?.OperatorAdjustment
                                            ?.operatoradjustment_id
                                        )
                                      }
                                    >
                                      Edit
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colspan="8">
                                  <div class="nodata">No Minimus Found</div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        tabid === "tb3" ? "show active" : ""
                      }`}
                      id="tbc"
                      aria-labelledby="tb3"
                    >
                      <div className="table-responsive marketTable ratestable">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Days</th>
                              <th scope="col">Start Date</th>
                              <th scope="col">End Date</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="5">
                                <div class="nodata">No Minimus Found</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="paginationBg">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a
                        className="page-link"
                        href="#"
                        tabindex="-1"
                        aria-disabled="true"
                      >
                        <i className="fa-solid fa-chevrons-left"></i>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <i className="fa-solid fa-chevrons-right"></i>
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

export default Rates;
