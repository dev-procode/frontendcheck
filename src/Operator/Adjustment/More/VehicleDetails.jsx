import React, { useState, useEffect } from "react";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  vehicleType,
  specificVehicle,
  updateVehicle,
} from "../../../Redux/vehicleslice";
import { fetchGarage } from "../../../Redux/garageSlice";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { addGarage } from "../../../Service/apis";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";

const VehicleDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.vehicle);
  const garageState = useSelector((state) => state.garage);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [vehicleData, setVehicleData] = useState();
  const [show, setShow] = useState(false);
  const [address_name, setAddress] = useState();
  const [city_name, setCity] = useState();
  const [state_name, setState] = useState();
  const [garagename, setGaragename] = useState();
  const [imgshow, setImgShow] = useState(false);
  const [imgurl, setImgUrl] = useState();
  const [convetImageArray, setConvetImageArray] = useState([]);
  const [formValue, setFormValue] = useState({
    vehicle_name: "",
    vehicle_type: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    capacity: "",
    vin: "",
    license_plate: "",
    garage: "",
    amenities_wifi: "",
    amenities_luggage: "",
    amenities_bathroom: "",
    amenities_seat_belts: "",
    amenities_ada_compliant: "",
    amenities_tv_screens: "",
    amenities_outlets: "",
    amenities_leather_seats: "",
  });
  const fileTypes = ["JPG", "JPEG", "PNG"];
  const [file, setFile] = useState([]);

  const handleDrop = (newfile) => {
    console.log("newfile", newfile);
    if (
      file.length >= 6 ||
      newfile.length > 6 ||
      file.length + newfile.length > 6 ||
      file.length +
        newfile.length +
        Object.entries(vehicleData?.Vehicle?.vehicle_image).length >
        6
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
  console.log("file", file);
  useEffect(() => {
    handleUploadImage();
  }, [file]);
  const handleChangeModalInput = (event) => {
    const { name, value } = event.target;
    setGaragename(value);
  };
  const handleSearchInput = (event) => {
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
  const allGarageData = async () => {
    dispatch(fetchGarage(operator_cognito_id));
  };
  const allVehicleType = async () => {
    dispatch(vehicleType());
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const specificVehicledata = async () => {
    const data = {
      operator_cognito_id,
      id,
    };
    dispatch(specificVehicle(data));
  };
  useEffect(() => {
    specificVehicledata();
    allVehicleType();
    allGarageData();
  }, []);
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormValue({
      ...formValue,
      [name]: checked,
    });
  };
  const addGarageData = async () => {
    if (garagename && selectAddress) {
      const data = {
        operator_cognito_id: operator_cognito_id,
        garage_name: garagename,
        garage_address: address_name ? address_name : "",
        garage_city: city_name ? city_name : address_name,
        garage_state: state_name,
        garage_place_id: selectAddress,
      };
      const responce = await addGarage(data);
      if (responce.status === 200) {
        toast.success("Successfull");
        handleClose();
        allGarageData();
      }
    }
  };
  const handleSubmit = async () => {
    const newconvetImageArray = {};
    console.log("new imgae", file, convetImageArray);
    convetImageArray.forEach((data, i) => {
      return (newconvetImageArray[`upload_${i}`] = data);
    });
    const {
      vehicle_name,
      vehicle_type,
      vehicle_make,
      vehicle_model,
      vehicle_year,
      capacity,
      vin,
      license_plate,
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
    const data = {
      // operator_cognito_id: operator_cognito_id,
      vehicle_name: vehicle_name,
      vehicle_type: vehicle_type,
      vehicle_make: vehicle_make,
      vehicle_model: vehicle_model,
      vehicle_year: vehicle_year,
      vehicle_capacity: capacity,
      vehicle_vin: vin,
      vehicle_license_plate: license_plate,
      vehicle_garage: garage,
      vehicle_image: convetImageArray.length != 0 ? newconvetImageArray : "",
      vehicle_amenities_wifi: amenities_wifi,
      vehicle_amenities_luggage: amenities_luggage,
      vehicle_amenities_bathroom: amenities_bathroom,
      vehicle_amenities_seat_belts: amenities_seat_belts,
      vehicle_amenities_ada_compliant: amenities_ada_compliant,
      vehicle_amenities_tv_screens: amenities_tv_screens,
      vehicle_amenities_outlets: amenities_outlets,
      vehicle_amenities_leather_seats: amenities_leather_seats,
    };
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === "") {
        delete data[key];
      }
    });
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });
    console.log("data", data);
    const params = {
      data,
      operator_cognito_id,
      id,
    };
    dispatch(updateVehicle(params));
    // toast.success("Successfully Update");
    navigate("/operator/vehicles");
  };
  useEffect(() => {
    handleUploadImage();
  }, [file.length]);
  const handleUploadImage = async (e) => {
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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handleAddress = (values) => {
    const address = values.address_components.filter(
      (f) =>
        JSON.stringify(f.types) === JSON.stringify(["locality", "political"])
    )[0]?.long_name;
    const city = values.address_components.filter(
      (f) =>
        JSON.stringify(f.types) ===
        JSON.stringify(["administrative_area_level_3", "political"])
    )[0]?.long_name;
    const state = values.address_components.filter(
      (f) =>
        JSON.stringify(f.types) ===
        JSON.stringify(["administrative_area_level_1", "political"])
    )[0]?.long_name;
    setAddress(address);
    setCity(city);
    setState(state);
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
  const handleChangeInput = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleImageView = (data) => {
    setImgUrl(data);
    setImgShow(true);
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
  useEffect(() => {
    setVehicleData(state.specificVehicleData);
  }, [state]);
  console.log("vehicleData", vehicleData);
  return (
    <div>
      <HeaderSecond />
      <Modal show={imgshow} onHide={() => setImgShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modalimgcontainer">
            <img src={imgurl} alt="imgurl" style={{ width: "90%" }} />
          </div>
        </Modal.Body>
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
                onChange={handleChangeModalInput}
              />
            </div>
            <div className="col-md-12 mb-3">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={searchData}
                className="form-control"
                onChange={handleSearchInput}
                placeholder="Enter Location"
              />
              <ul className="list-group listclass">
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
                  <h4>Update Vehicle</h4>
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
                      <h6>Uploaded files:</h6>
                      <ol className="imagelist">
                        {vehicleData?.Vehicle?.vehicle_image &&
                          Object.values(
                            vehicleData?.Vehicle?.vehicle_image
                          ).map((data, index) => {
                            return (
                              <li key={index}>
                                <div
                                  className="imgcontainer"
                                  onClick={() => handleImageView(data)}
                                >
                                  <img
                                    src={data}
                                    alt="imgdata"
                                    className="uploadedimage"
                                  />
                                </div>
                              </li>
                            );
                          })}
                      </ol>
                      <ul>
                        {file.length != 0
                          ? file.map((data, index) => {
                              return (
                                <li key={index}>{`File${index + 1} : ${
                                  data.name
                                }`}</li>
                              );
                            })
                          : !vehicleData?.Vehicle?.vehicle_image &&
                            "No files uploaded yet"}
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
                          defaultValue={vehicleData?.Vehicle?.vehicle_name}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Type</label>
                        <select
                          className="form-control"
                          name="vehicle_type"
                          defaultValue={
                            vehicleData?.VehicleType?.vehicletype_name
                          }
                          onChange={handleChangeInput}
                        >
                          <option>Select</option>
                          {state?.type.length != 0 &&
                            state?.type.map((data, index) => {
                              return (
                                <option
                                  value={data?.VehicleType?.vehicletype_id}
                                  key={index}
                                  selected={
                                    data?.VehicleType?.vehicletype_id ===
                                    vehicleData?.VehicleType?.vehicletype_id
                                  }
                                >
                                  {data?.VehicleType?.vehicletype_name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Make</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vehicle_make"
                          defaultValue={vehicleData?.Vehicle?.vehicle_make}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Model</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vehicle_model"
                          defaultValue={vehicleData?.Vehicle?.vehicle_model}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vehicle Year</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vehicle_year"
                          defaultValue={vehicleData?.Vehicle?.vehicle_year}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Capacity</label>
                        <input
                          type="text"
                          className="form-control"
                          name="capacity"
                          defaultValue={vehicleData?.Vehicle?.vehicle_capacity}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>Vin #</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vin"
                          defaultValue={vehicleData?.Vehicle?.vehicle_vin}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label>License Plate</label>
                        <input
                          type="text"
                          className="form-control"
                          name="license_plate"
                          defaultValue={
                            vehicleData?.Vehicle?.vehicle_license_plate
                          }
                          onChange={handleChangeInput}
                        />
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
                                  selected={
                                    data?.Garage?.garage_id ===
                                    vehicleData?.Vehicle?.vehicle_garage
                                  }
                                >
                                  {data?.Garage?.garage_name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <h5>Amenities</h5>
                    <div class="checkbx">
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_wifi"
                          onClick={handleCheckboxChange}
                          defaultChecked={
                            vehicleData?.Vehicle?.vehicle_amenities_wifi
                          }
                        />{" "}
                        Wifi
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_luggage"
                          onClick={handleCheckboxChange}
                          defaultChecked={
                            vehicleData?.Vehicle?.vehicle_amenities_luggage
                          }
                        />{" "}
                        Luggage
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_bathroom"
                          onClick={handleCheckboxChange}
                          defaultChecked={
                            vehicleData?.Vehicle?.vehicle_amenities_bathroom
                          }
                        />{" "}
                        Bathroom
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_seat_belts"
                          onClick={handleCheckboxChange}
                          defaultChecked={
                            vehicleData?.Vehicle?.vehicle_amenities_seat_belts
                          }
                        />{" "}
                        Seat Belts
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_ada_compliant"
                          onClick={handleCheckboxChange}
                          defaultChecked={
                            vehicleData?.Vehicle
                              ?.vehicle_amenities_ada_compliant
                          }
                        />{" "}
                        ADA Compliant
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_tv_screens"
                          onClick={handleCheckboxChange}
                          defaultChecked={
                            vehicleData?.Vehicle?.vehicle_amenities_tv_screens
                          }
                        />{" "}
                        TV Screens
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_outlets"
                          onClick={handleCheckboxChange}
                          defaultChecked={
                            vehicleData?.Vehicle?.vehicle_amenities_outlets
                          }
                        />{" "}
                        Outlets
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="amenities_leather_seats"
                          onClick={handleCheckboxChange}
                          defaultChecked={
                            vehicleData?.Vehicle
                              ?.vehicle_amenities_leather_seats
                          }
                        />{" "}
                        Leather Seats
                      </span>
                    </div>
                  </div>
                  <Button type="button" onClick={handleSubmit}>
                    Update
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

export default VehicleDetails;
