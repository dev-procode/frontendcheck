import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sepecificGarage } from "../../../Redux/garageSlice";
import { getSpecificGarageData, getCheckGarage } from "../../../Service/apis";
import axios from "axios";
import { toast } from "react-toastify";
const GarageDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.garage);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const [garagedata, setGarageData] = useState();
  const [address_name, setAddress] = useState();
  const [city_name, setCity] = useState();
  const [state_name, setState] = useState();
  const [selectAddress, setSelectAddress] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [updateCheck, setUpdateCheck] = useState(false);
  const handleChangeInput = (event) => {
    setSearchData(event.target.value);
  };
  const handleSearch = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchData}'&components=country:us&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
    const responce = await axios.get(url);
    setSearchList(responce.data?.predictions);
  };
  useEffect(() => {
    handleSearch();
  }, [searchData]);

  const checkGararege = async () => {
    const response = await getCheckGarage(operator_cognito_id, id);
    setUpdateCheck(response.data);
  };
  const specificGarage = async () => {
    const data = {
      operator_cognito_id,
      id,
    };
    dispatch(sepecificGarage(data));
  };
  const mapdata = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${garagedata?.garage_place_id}&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
    const placesResponse = await axios.get(url);
    const place = placesResponse?.data?.result?.formatted_address;
    setSearchData(place);
  };
  const update = () => {
    if (updateCheck) {
      toast.error(
        "Can't update the garage because it's already used somewhere"
      );
    } else {
      console.log("update", address_name, city_name, state_name);
    }
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
    specificGarage();
    checkGararege();
  }, []);
  useEffect(() => {
    setGarageData(state.specificGarageData);
  }, [state]);
  useEffect(() => {
    mapdata();
  }, [state]);
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
                  <h4>Garage Details</h4>
                  <div>
                    <button
                      className="commonButton cancel"
                      onClick={() => navigate("/operator/garages")}
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;
                    <button className="commonButton" onClick={update}>
                      Update
                    </button>
                  </div>
                </div>
                <div className="vehiclebase">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={garagedata?.garage_name}
                        className="form-control"
                        onChange={(event) => setGarageData(event.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={searchData}
                        className="form-control"
                        onChange={handleChangeInput}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GarageDetails;
