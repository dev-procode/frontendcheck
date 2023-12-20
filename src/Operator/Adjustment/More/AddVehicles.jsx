import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVehicle, vehicleType } from "../../../Redux/vehicleslice";
import { fetchGarage } from "../../../Redux/garageSlice";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { addGarage } from "../../../Service/apis";
import { useFormik } from "formik";
import * as yup from "yup";
import deleteicon from "../../../assets/images/deleteicon.jpg";
import Dropzone from "react-dropzone";
import axios from "axios";

const AddVehicles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.vehicle);
  const garageState = useSelector((state) => state.garage);
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const [erroeData, setErrorData] = useState("");
  const [show, setShow] = useState(false);
  const [address_name, setAddress] = useState();
  const [city_name, setCity] = useState();
  const [state_name, setState] = useState();
  const [garagename, setGaragename] = useState();
  const [convetImageArray, setConvetImageArray] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [imgIndex, setImageIndex] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [formValue, setFormValue] = useState({
    garage: 0,
    amenities_wifi: false,
    amenities_luggage: false,
    amenities_bathroom: false,
    amenities_seat_belts: false,
    amenities_ada_compliant: false,
    amenities_tv_screens: false,
    amenities_outlets: false,
    amenities_leather_seats: false,
  });
  const formik = useFormik({
    initialValues: {
      vehicle_name: "",
      vehicle_type: "",
      vehicle_make: "",
      vehicle_model: "",
      vehicle_year: "",
      min_capacity: "",
      max_capacity: "",
      vin: "",
      license_plate: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: yup.object().shape({
      vehicle_name: yup.string().required("vehicle name is required"),
      vehicle_type: yup.string().required("Vehicle type is required"),
      vehicle_make: yup.string().required("Vehicle make is required"),
      vehicle_model: yup.string().required("Vehicle model is required"),
      vehicle_year: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only number")
        .required("Vehicle year is required"),
      min_capacity: yup
        .number()
        .min(1, "Min capacity must be greater than 0")
        .required("Min capacity is required"),
      max_capacity: yup
        .number()
        .min(
          yup.ref("min_capacity"),
          "Max capacity must be greater than min capacity."
        )
        .required("Max capacity is required"),

      vin: yup.string().required("Vin is required"),
      license_plate: yup.string().required("License plate is required"),
      // garage: yup.string().required("Garage is required"),
    }),
  });
  const fileTypes = ["JPG", "JPEG", "PNG"];
  const [file, setFile] = useState([]);
  const handleDrop = (newfile) => {
    if (
      file.length >= 6 ||
      newfile.length > 6 ||
      file.length + newfile.length > 6
    ) {
      toast.error("Maximum 6 file can upload");
    } else {
      if (newfile.length > 1) {
        Object.values(newfile).forEach((d) => {
          return setFile([...file, ...newfile]);
        });
      } else {
        Object.values(newfile).forEach((d) => {
          return setFile([...file, ...newfile]);
        });
      }
    }
  };
  useEffect(() => {
    handleUploadImage();
  }, [file]);
  const handleChangeInput = (event) => {
    setSearchData(event.target.value);
  };
  const handleSearch = async () => {
    const key = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchData}'&components=country:us&key=${key}`;
    const responce = await axios.get(url);
    setSearchList(responce.data?.predictions);
  };
  useEffect(() => {
    handleSearch();
  }, [searchData]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addGarageData = async () => {
    if (garagename && state_name) {
      const data = {
        operator_cognito_id: operator_cognito_id,
        name: garagename,
        address: address_name ? address_name : "",
        city: city_name ? city_name : address_name,
        state: state_name,
        place_id: selectAddress,
      };
      const responce = await addGarage(data);
      if (responce.status === 200) {
        toast.success("Successfull");
        handleClose();
        setGaragename("");
        allGarageData();
      }
    } else {
      setErrorData("Please Fill All Fields");
    }
  };
  const allVehicleType = async () => {
    dispatch(vehicleType());
  };
  useEffect(() => {
    allGarageData();
    allVehicleType();
  }, []);
  const allGarageData = async () => {
    dispatch(fetchGarage(operator_cognito_id));
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormValue({
      ...formValue,
      [name]: checked,
    });
  };
  const handleAddNewGarageAndSelect = (event) => {
    if (event.target.value === "add") {
      handleShow();
    } else {
      setFormValue({
        ...formValue,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleUploadImage = async () => {
    file.forEach((data, i) => {
      getBase64(data).then((data) => {
        let newData = data.replace(/^data:image\/[a-z]+;base64,/, "");

        if (convetImageArray.includes(newData)) {
          return convetImageArray;
        } else {
          return convetImageArray.push(newData);
        }
      });
    });
  };

  const handleSubmit = async (values) => {
    const newconvetImageArray = {};
    convetImageArray.forEach((data, i) => {
      return (newconvetImageArray[`upload_${i}`] = data);
    });
    const {
      vehicle_name,
      vehicle_type,
      vehicle_make,
      vehicle_model,
      vehicle_year,
      min_capacity,
      max_capacity,
      vin,
      license_plate,
    } = values;
    const {
      garage,
      amenities_wifi,
      amenities_luggage,
      amenities_bathroom,
      amenities_seat_belts,
      amenities_ada_compliant,
      amenities_tv_screens,
      amenities_outlets,
      amenities_leather_seats,
    } = formValue;
    const lastImageObject = newconvetImageArray;
    const data = {
      operator_cognito_id: operator_cognito_id,
      vehicle_name: vehicle_name,
      vehicle_type: vehicle_type,
      vehicle_make: vehicle_make,
      vehicle_model: vehicle_model,
      vehicle_year: vehicle_year,
      vehicle_min_capacity: min_capacity,
      vehicle_max_capacity: max_capacity,
      vehicle_vin: vin,
      vehicle_license_plate: license_plate,
      vehicle_garage: garage,
      vehicle_image: newconvetImageArray,
      vehicle_amenities_wifi: amenities_wifi,
      vehicle_amenities_luggage: amenities_luggage,
      vehicle_amenities_bathroom: amenities_bathroom,
      vehicle_amenities_seat_belts: amenities_seat_belts,
      vehicle_amenities_ada_compliant: amenities_ada_compliant,
      vehicle_amenities_tv_screens: amenities_tv_screens,
      vehicle_amenities_outlets: amenities_outlets,
      vehicle_amenities_leather_seats: amenities_leather_seats,
    };
    dispatch(addVehicle(data));
    toast.success("Succesfully Added");
    navigate("/operator/vehicles");
    setFile([]);
    setConvetImageArray([]);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const deleteImageData = () => {
    const data = file.splice(imgIndex, 1);

    const filterdata = file.filter((d) => d != data);
    setFile(filterdata);
    setConvetImageArray([]);
    setImageIndex("");
    toast.success("Successfully deleted");
    setConfirm(false);
  };
  const handleConfirmDelete = (i) => {
    setImageIndex(i);
    setConfirm(true);
  };
  const handleSelectSearch = (data) => {
    setSelectAddress(data.place_id);
    setSearchData(data?.description);
    setState(data?.terms.at(-2).value);
    setCity(data?.terms.at(-3).value);
    setAddress(
      data?.terms
        .slice(0, data?.terms.length - 3)
        .map((value) => value.value)
        .join(", ")
    );
  };
  return (
    <div>
      <HeaderSecond />
      <Modal show={confirm} onHide={() => setConfirm(false)}>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>Are you Sure</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setConfirm(false)}>
            No
          </Button>
          <Button variant="primary" onClick={deleteImageData}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add New Garage</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={garagename}
                className="form-control"
                onChange={(e) => setGaragename(e.target.value)}
              />
            </div>
            <div className="col-md-12 mb-3">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={searchData}
                className="form-control"
                onChange={handleChangeInput}
                placeholder="Enter Location"
              />
              <ul className="list-group Add New Garage">
                {searchList.length != 0 &&
                  searchList.map((data, i) => (
                    <li
                      key={i}
                      value={data?.place_id}
                      className="list-group-item"
                      onClick={() => handleSelectSearch(data)}
                    >
                      {data?.description}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
        {erroeData && (
          <p className="errordata" style={{ textAlign: "center" }}>
            {erroeData}
          </p>
        )}
        <Modal.Footer>
          <Button variant="primary" onClick={addGarageData}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <section class="">
        <div class="container">
          <div class="row">
            <Sidebar />
            <div class="col-lg-9">
              <div class="dbRgt">
                <div class="bookinghdn">
                  <h4>Add Vehicle</h4>
                  <div>
                    <button
                      class="commonButton cancel"
                      onClick={() => navigate("/operator/vehicles")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <form>
                  <div class="vehiclebase">
                    <h5>Vehicle Image</h5>
                    <div class="file-upload">
                      {/* <FileUploader
                        multiple={true}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                        label={''}
                      /> */}
                      <Dropzone onDrop={handleDrop}>
                        {({ getRootProps, isDragAccept, isDragReject }) => {
                          const additionalClass = isDragAccept
                            ? "accept"
                            : isDragReject
                            ? "reject"
                            : "";

                          return (
                            <div
                              {...getRootProps({
                                className: `dropzone ${additionalClass}`,
                              })}
                            >
                              <label class="file-upload__label droparea">
                                <i class="fa-solid fa-cloud-arrow-up"></i>{" "}
                                Select or drop files here
                              </label>
                            </div>
                          );
                        }}
                      </Dropzone>
                      <ul className="filelist">
                        {file.length != 0
                          ? file.map((data, index) => {
                              return (
                                <li key={index}>
                                  {`File${index + 1} : ${data.name}`}{" "}
                                  <img
                                    src={deleteicon}
                                    alt="deleteicon"
                                    className="deleteicon"
                                    onClick={() => handleConfirmDelete(index)}
                                  />
                                </li>
                              );
                            })
                          : "No files uploaded yet"}
                      </ul>
                      {/* <input
                        class="file-upload__input"
                        multiple=""
                        type="file"
                      /> */}
                    </div>

                    <h5 class="mb-2">Vehicle Information</h5>
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vehicle_name"
                          value={formik.values.vehicle_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.vehicle_name &&
                          formik.errors.vehicle_name && (
                            <div style={{ color: "red" }}>
                              {formik.errors.vehicle_name}
                            </div>
                          )}
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Type</label>
                        <select
                          className="form-control"
                          name="vehicle_type"
                          value={formik.values.vehicle_type}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Select</option>
                          {state?.type.length != 0 &&
                            state?.type.map((data, index) => {
                              return (
                                <option
                                  value={data?.VehicleType?.vehicletype_id}
                                  key={index}
                                >
                                  {data?.VehicleType?.vehicletype_name}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.vehicle_type &&
                          formik.errors.vehicle_type && (
                            <div style={{ color: "red" }}>
                              {formik.errors.vehicle_type}
                            </div>
                          )}
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Make</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vehicle_make"
                          value={formik.values.vehicle_make}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.vehicle_make &&
                          formik.errors.vehicle_make && (
                            <div style={{ color: "red" }}>
                              {formik.errors.vehicle_make}
                            </div>
                          )}
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Model</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vehicle_model"
                          value={formik.values.vehicle_model}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.vehicle_model &&
                          formik.errors.vehicle_model && (
                            <div style={{ color: "red" }}>
                              {formik.errors.vehicle_model}
                            </div>
                          )}
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Year</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vehicle_year"
                          value={formik.values.vehicle_year}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.vehicle_year &&
                          formik.errors.vehicle_year && (
                            <div style={{ color: "red" }}>
                              {formik.errors.vehicle_year}
                            </div>
                          )}
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Min Capacity</label>
                        <input
                          type="text"
                          className="form-control"
                          name="min_capacity"
                          value={formik.values.min_capacity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.min_capacity &&
                          formik.errors.min_capacity && (
                            <div style={{ color: "red" }}>
                              {formik.errors.min_capacity}
                            </div>
                          )}
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Max Capacity</label>
                        <input
                          type="text"
                          className="form-control"
                          name="max_capacity"
                          value={formik.values.max_capacity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.max_capacity &&
                          formik.errors.max_capacity && (
                            <div style={{ color: "red" }}>
                              {formik.errors.max_capacity}
                            </div>
                          )}
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vin #</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vin"
                          value={formik.values.vin}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.vin && formik.errors.vin && (
                          <div style={{ color: "red" }}>
                            {formik.errors.vin}
                          </div>
                        )}
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>License Plate</label>
                        <input
                          type="text"
                          className="form-control"
                          name="license_plate"
                          value={formik.values.license_plate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.license_plate &&
                          formik.errors.license_plate && (
                            <div style={{ color: "red" }}>
                              {formik.errors.license_plate}
                            </div>
                          )}
                      </div>
                      <div class="col-md-12 mb-4">
                        <label>Garage</label>
                        <select
                          className="form-control"
                          name="garage"
                          onChange={(e) => handleAddNewGarageAndSelect(e)}
                        >
                          <option>Please Select</option>
                          <option className="addnew" value={"add"}>
                            {" "}
                            + Add New Garage{" "}
                          </option>
                          {garageState?.data.length != 0 &&
                            garageState?.data.map((data, index) => {
                              return (
                                <option
                                  value={data?.Garage?.garage_id}
                                  name="garage"
                                  key={index}
                                >
                                  {data?.Garage?.garage_name}
                                </option>
                              );
                            })}
                        </select>
                        {/* {!formValue.garage && !formValue.garage && (
                          <div style={{ color: "red" }}>
                            Garage name is required
                          </div>
                        )} */}
                      </div>
                    </div>
                    <h5>Amenities</h5>
                    <div class="checkbx">
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_wifi"
                          onClick={handleCheckboxChange}
                        />{" "}
                        Wifi
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_luggage"
                          onClick={handleCheckboxChange}
                        />{" "}
                        Luggage
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_bathroom"
                          onClick={handleCheckboxChange}
                        />{" "}
                        Bathroom
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_seat_belts"
                          onClick={handleCheckboxChange}
                        />{" "}
                        Seat Belts
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_ada_compliant"
                          onClick={handleCheckboxChange}
                        />{" "}
                        ADA Compliant
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_tv_screens"
                          onClick={handleCheckboxChange}
                        />{" "}
                        TV Screens
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_outlets"
                          onClick={handleCheckboxChange}
                        />{" "}
                        Outlets
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_leather_seats"
                          onClick={handleCheckboxChange}
                        />{" "}
                        Leather Seats
                      </span>
                    </div>
                  </div>
                  <Button type="submit" onClick={formik.handleSubmit}>
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddVehicles;
