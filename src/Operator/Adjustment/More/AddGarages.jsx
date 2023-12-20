import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GarageAdd } from "../../../Redux/garageSlice";
import axios from "axios";

const AddGarages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.garage);
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const ApiKey = process.env.GOOGLE_API_KEY;
  const [erroeData, setErrorData] = useState("");
  const [address_name, setAddress] = useState();
  const [city_name, setCity] = useState();
  const [state_name, setState] = useState();
  const [name, setName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const handleChangeInput = (event) => {
    setSearchData(event.target.value);
  };
  const handleSearch = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchData}'&components=country:us&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
    const responce = await axios.get(url);
    setSearchList(responce.data?.predictions);
  console.log("address", responce.data?.predictions);

  };
  console.log("address", searchList);
  useEffect(() => {
    handleSearch();
  }, [searchData]);
  const addGarageData = async () => {
    if (name && selectAddress) {
      const data = {
        operator_cognito_id: operator_cognito_id,
        garage_name: name,
        garage_address: address_name ? address_name : "",
        garage_city: city_name ? city_name : address_name,
        garage_state: state_name,
        garage_place_id: selectAddress,
      };
      setErrorData("");
      dispatch(GarageAdd(data));
      toast.success("Successfull");
      navigate("/operator/garages");
    } else {
      setErrorData("Please Fill All Fields");
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
                  <h4>Add Garage</h4>
                  <div>
                    <button
                      className="commonButton cancel"
                      onClick={() => navigate("/operator/garages")}
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;
                    <button className="commonButton" onClick={addGarageData}>
                      Save
                    </button>
                  </div>
                </div>

                {erroeData && <p className="errordata">{erroeData}</p>}
                <div className="vehiclebase">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        className="form-control"
                        onChange={(event) => setName(event.target.value)}
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

export default AddGarages;
