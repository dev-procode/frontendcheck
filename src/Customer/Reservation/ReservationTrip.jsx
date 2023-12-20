import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchType, requestReserv } from "../../Redux/reservationSlice";
import HeaderSecond from "../../Common/HeaderSecond";
import note from "../../assets/images/note.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Map, GoogleApiWrapper, Polyline, Marker } from "google-maps-react";
import cross from "../../assets/images/cross.png";

const ReservationTrip = ({ google }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reservation);
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const [count, setCount] = useState([]);
  const [flag, setFlag] = useState(false);
  const [passenger, setPassanger] = useState();
  const [keyValue, setKeyValue] = useState("");
  const [departureDate, setDepartureDate] = useState();
  const [departurePlace, setDeparturePlace] = useState();
  const [arrivaltime, setArrivaltime] = useState();
  const [leavingTime, setLeavingTime] = useState();
  const [lastleavingtime, setLastLeavingTime] = useState();
  const [leavingTimeError, setLeavingTimeError] = useState("");
  const [formData, setFormData] = useState();
  const [address_name, setAddress] = useState();
  const [city_name, setCity] = useState();
  const [state_name, setState] = useState();
  const [name, setName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [destinationSearchList, setDestinationSearchList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [destination, setDestination] = useState("");
  const [dusration, setDuration] = useState();
  const [distance, setDistance] = useState();
  const [completekey, setCompleteKey] = useState([]);
  const [destinationAdrress, setDestinationAdrress] = useState("");
  const [dropOffTime, setDropOffTime] = useState();
  const [showList, setShowList] = useState(true);
  const [showDes, setShowDes] = useState(true);
  const [eventType, setEventType] = useState();
  const [typeError, setTyeError] = useState();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString().slice(0, 5)
  );
  const [directions, setDirections] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [finalDestination, setFinalDestination] = useState();
  const [waypointsCoords, setWaypointsCoords] = useState([]);
  const [tempKey, setTempKey] = useState("x");
  const waypointsFormatted = waypoints.map((waypoint) => ({
    location: waypoint.location,
    stopover: true,
  }));
  const [waitingtime, setWaitingtime] = useState(0);
  useEffect(() => {
    setOriginCoords(null);
    setDirections(null);
    setDestinationCoords(null);
    // setWaypointsCoords([]);
    const directionsService = new google.maps.DirectionsService();

    finalDestination
      ? directionsService.route(
          {
            origin: departurePlace,
            destination: finalDestination,
            waypoints: waypoints.map((waypoint) => ({
              location: waypoint.location,
              stopover: true,
            })),
            travelMode: "DRIVING",
          },
          (result, status) => {
            console.log("result", result, status);
            if (status === "OK" && result.routes && result.routes.length > 0) {
              const bounds = new google.maps.LatLngBounds();
              result.routes[0].overview_path.forEach((point) =>
                bounds.extend(point)
              );
              const routeCenter = bounds.getCenter();
              setDirections(result.routes[0]);
              setOriginCoords(result.routes[0].legs[0].start_location);
              setDestinationCoords(
                result.routes[0].legs[result.routes[0].legs.length - 1]
                  .end_location
              );
              result.routes[0].legs[result.routes[0].legs.length - 1].steps.map(
                (step, i) => {
                  if (
                    result.routes[0].legs[result.routes[0].legs.length - 1]
                      .steps.length ===
                    i + 1
                  ) {
                    if (tempKey === keyValue) {
                      waypointsCoords.pop();
                      waypointsCoords.push({
                        lat: step.end_location.lat(),
                        lng: step.end_location.lng(),
                      });
                    } else {
                      waypointsCoords.push({
                        lat: step.end_location.lat(),
                        lng: step.end_location.lng(),
                      });
                      setTempKey(keyValue);
                    }
                  }
                }
              );
              setWaypointsCoords(waypointsCoords);
            } else {
              console.error("Error fetching directions:", result);
            }
          }
        )
      : waypointsCoords.pop();
    setWaypointsCoords(waypointsCoords);
  }, [google, departurePlace, destination, finalDestination]);
  const centerMapOnRoute = () => {
    if (directions && directions.overview_path && google) {
      const bounds = new google.maps.LatLngBounds();
      directions.overview_path.forEach((point) => bounds.extend(point));
      const mapCenter = bounds.getCenter();
      const mapZoom = 10; // Adjust the zoom level as needed
      return { center: mapCenter, zoom: mapZoom };
    }
    return null;
  };

  const mapOptions = centerMapOnRoute();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString().slice(0, 5));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    dispatch(fetchType());
  }, []);
  const handleDestinationStart = (event) => {
    searchDestination(event.target.value);
    setShowDes(true);
    setFinalDestination(event.target.value);
  };
  const handleSearch = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${departurePlace}'&components=country:us&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
    const responce = await axios.get(url);
    setSearchList(responce.data?.predictions);
  };
  const searchDestination = async (val) => {
    setDestination(val);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${val}'&components=country:us&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
    const responce = await axios.get(url);
    setDestinationSearchList(responce.data?.predictions);
    calculatedistance(val);
    handleDropOffTime();
  };

  const handleSelectSearch = (data) => {
    setShowList(false);
    setSelectAddress(data.place_id);
    setDeparturePlace(data?.description);

    setState(data?.terms.at(-2).value);
    setCity(data?.terms.at(-3).value);
    setAddress(
      data?.terms
        .slice(0, data?.terms.length - 3)
        .map((value) => value.value)
        .join(", ")
    );
  };
  const handleDestination = (data) => {
    setShowDes(false);
    setDestinationAdrress(data.place_id);
    setDestination(data.description);
    setFinalDestination(data.description);
    if (destination) {
      waypoints.pop();
      waypoints.push({ location: data.description });
      setWaypoints(waypoints);
    } else {
      waypoints.push({ location: data.description });
      setWaypoints(waypoints);
    }
  };
  const editData = (data) => {
    if (completekey[completekey.length - 1] === keyValue) {
      waypoints.pop();
      waypoints.push({ location: data.description });
      setWaypoints(waypoints);
    } else {
      waypoints.push({ location: data.description });
      setWaypoints(waypoints);
    }
  };
  const handleDepartureSelectSearch = (data, key) => {
    editData(data);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: {
        ...prevFormData[key],
        ["placeId"]: data.place_id,
        ["place"]: data.description,
        ["show"]: false,
      },
    }));
    completekey.push(key);
    setCompleteKey(completekey);
    setFinalDestination(data.description);

    calculatedistanceNext(data.description);
  };
  useEffect(() => {
    if (departurePlace) {
      handleSearch();
    }
  }, [departurePlace]);
  const handleLastLeavTime = (e) => {
    setLastLeavingTime(e.target.value);
  };
  const handleDropOffTime = () => {
    if (leavingTime) {
      // console.log("leavingTime", leavingTime);
      const timeString = leavingTime;
      const secondsToAdd = dusration;

      // Parsing the time string into hours and minutes
      const [hoursString, minutesString] = timeString.split(":");
      const hours = parseInt(hoursString, 10);
      const minutes = parseInt(minutesString, 10);

      // Convert the time to seconds
      const totalSecondsFromTime = hours * 3600 + minutes * 60;

      // Add the seconds
      const totalSeconds = totalSecondsFromTime + secondsToAdd;

      // Convert the total seconds back to hours and minutes
      const updatedHours = Math.floor(totalSeconds / 3600) % 24;
      const remainingSeconds = totalSeconds % 3600;
      const updatedMinutes = Math.floor(remainingSeconds / 60);

      setDropOffTime(
        `${updatedHours.toString().padStart(2, "0")}:${updatedMinutes
          .toString()
          .padStart(2, "0")}`
      );
      // console.log(
      //   `New time: ${updatedHours.toString().padStart(2, "0")}:${updatedMinutes
      //     .toString()
      //     .padStart(2, "0")}`
      // );
    }
  };
  const handleDropOffTimeNext = (data) => {
    let timeString = "";
    if (keyValue === "A") {
      timeString = lastleavingtime;
    } else {
      timeString = formData[count[count.length - 2]].leavingtime;
    }

    const secondsToAdd = data;

    // Parsing the time string into hours and minutes
    const [hoursString, minutesString] = timeString.split(":");
    const hours = parseInt(hoursString, 10);
    const minutes = parseInt(minutesString, 10);

    // Convert the time to seconds
    const totalSecondsFromTime = hours * 3600 + minutes * 60;

    // Add the seconds
    const totalSeconds = totalSecondsFromTime + secondsToAdd;

    // Convert the total seconds back to hours and minutes
    const updatedHours = Math.floor(totalSeconds / 3600) % 24;
    const remainingSeconds = totalSeconds % 3600;
    const updatedMinutes = Math.floor(remainingSeconds / 60);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [keyValue]: {
        ...prevFormData[keyValue],
        ["droptime"]: `${updatedHours
          .toString()
          .padStart(2, "0")}:${updatedMinutes.toString().padStart(2, "0")}`,
      },
    }));
    // console.log(
    //   `New time: ${updatedHours.toString().padStart(2, "0")}:${updatedMinutes
    //     .toString()
    //     .padStart(2, "0")}`
    // );
  };
  // console.log("dropOffTime", dropOffTime);
  useEffect(() => {
    handleDropOffTime();
  }, [dusration]);
  const calculatedistance = async () => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${departurePlace}&destinations=${destination}&mode=driving&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
    const responce = await axios.get(url);
    setDuration(responce?.data?.rows[0]?.elements[0]?.duration?.value);
    setDistance(responce?.data?.rows[0]?.elements[0]?.distance?.value);
    // console.log("time-->", responce?.data?.rows[0]?.elements[0]?.duration);
  };
  const calculatedistanceNext = async (data) => {
    if (formData) {
      let url = "";

      if (keyValue === "A") {
        url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${departurePlace}&destinations=${data}&mode=driving&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
      } else {
        url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
          formData[count[count.length - 2]]?.place
        }&destinations=${data}&mode=driving&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
      }
      const responce = await axios.get(url);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [keyValue]: {
          ...prevFormData[keyValue],
          ["duration"]: responce?.data?.rows[0]?.elements[0]?.duration?.value,
          ["distance"]: responce?.data?.rows[0]?.elements[0]?.distance?.value,
        },
      }));
      handleDropOffTimeNext(
        responce?.data?.rows[0]?.elements[0]?.duration?.value
      );
      // console.log("NExt-->", responce?.data?.rows[0]);
    }
  };
  useEffect(() => {
    calculatedistance();
  }, [destination]);
  const addmore = () => {
    if (count.length == 0) {
      setCount(["A"]);
      setKeyValue("A");
    } else {
      setKeyValue(
        String.fromCharCode(count[count.length - 1].charCodeAt() + 1)
      );
      count.push(String.fromCharCode(count[count.length - 1].charCodeAt() + 1));
      setCount(count);

      setFlag(!flag);
    }
  };
  useEffect(() => {
    setKeyValue(count[count.length - 1]);
  }, [count]);
  const remove = (data) => {
    const newData = Object.keys(formData)
      .filter((key) => key !== data)
      .reduce((obj, key) => {
        obj[key] = formData[key];
        return obj;
      }, {});
    const filterData = count.filter((item) => item !== data);

    setCount(filterData);
    if (filterData.length > 0) {
      setKeyValue(
        String.fromCharCode(filterData[filterData.length - 1].charCodeAt() - 1)
      );
    } else {
      setKeyValue("");
    }
    console.log("keyvalue", keyValue, count);
    waypoints.pop();
    setWaypoints(waypoints);
    setFormData(newData);
    if (count.length > 1) {
      setFinalDestination(newData[count[count.length - 2]].place);
    } else {
      setFinalDestination(newData[count["A"]].place);
    }
    const directionsService = new google.maps.DirectionsService();
    console.log("waypoints", waypoints, newData);
    setWaypointsCoords([]);
    directionsService.route(
      {
        origin: departurePlace,
        destination:
          count.length > 1
            ? newData[count[count.length - 2]].place
            : newData[count["A"]].place,
        waypoints: waypoints.map((waypoint) => ({
          location: waypoint.location,
          stopover: true,
        })),
        travelMode: "DRIVING",
      },
      (result, status) => {
        console.log("result", result, status);
        if (status === "OK" && result.routes && result.routes.length > 0) {
          setDirections(result.routes[0]);
          setOriginCoords(result.routes[0].legs[0].start_location);
          setDestinationCoords(
            result.routes[0].legs[result.routes[0].legs.length - 1].end_location
          );
          result.routes[0].legs[result.routes[0].legs.length - 1].steps.map(
            (step, i) => {
              if (
                result.routes[0].legs[result.routes[0].legs.length - 1].steps
                  .length ===
                i + 1
              ) {
                waypointsCoords.push({
                  lat: step.end_location.lat(),
                  lng: step.end_location.lng(),
                });
              }
            }
          );

          // console.log("coord", result.routes[0].legs, waypointsCoords);

          setWaypointsCoords(waypointsCoords);
        } else {
          console.error("Error fetching directions:", result);
        }
      }
    );
  };
  const validateTimes = (arrival, leaving) => {
    const isValidTime = arrival < leaving;
    if (isValidTime) {
      setLeavingTime(leaving);
      setLeavingTimeError("");
    } else {
      setLeavingTime();
      setLeavingTimeError("Leaving time must be greater than arrival time");
    }
  };
  const getTimeInSeconds = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60; // Convert hours and minutes to seconds
  };
  const handleLeavingTime = (timeValue) => {
    validateTimes(arrivaltime, timeValue);
  };
  const handleChangeInput = (event, data) => {
    const { value, name } = event.target;
    if (name === "place") {
      handleSearchDestination(value, data);
      setFinalDestination(value);
    }
    if (count.length === 1 && name === "place") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [data]: {
          [name]: value,
          ["show"]: true,
        },
      }));
    } else {
      if (name === "place") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [data]: {
            [name]: value,
            ["show"]: true,
          },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [data]: {
            ...prevFormData[data],
            [name]: value,
          },
        }));
      }
    }
  };
  const handleSearchDestination = async (value, data) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}'&components=country:us&key=AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU`;
    const responce = await axios.get(url);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [data]: {
        ...prevFormData[data],
        ["searchList"]: responce.data?.predictions,
      },
    }));
    calculatedistanceNext();
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleContinue = () => {
    const arrive = getTimeInSeconds(arrivaltime);
    const leave = getTimeInSeconds(leavingTime);
    const diff = Math.abs(leave - arrive);
    let differenceInSeconds = 0;
    if (lastleavingtime) {
      const newleavetime = getTimeInSeconds(lastleavingtime);
      const droptime = getTimeInSeconds(dropOffTime);
      differenceInSeconds = Math.abs(newleavetime - droptime);
    }

    let sum = 0;
    let totaldis = distance;
    if (count.length != 0) {
      for (let i = 0; i < count.length; i++) {
        if (i + 1 === count.length) {
          // totaldis += formData[count[i]].distance;
          console.log("hhh", count[i]);
        } else {
          totaldis += formData[count[i]].distance;
          sum += Math.abs(
            getTimeInSeconds(formData[count[i]].leavingtime) -
              getTimeInSeconds(formData[count[i]].droptime)
          );
          console.log("doooo", sum);
          // Perform actions based on the condition for the remaining keys
        }
      }
      for (let i = 0; i < count.length; i++) {
        totaldis += formData[count[i]].distance;
        // Perform actions based on the condition for the remaining keys
      }
    }
    console.log("dis", totaldis, formData, distance);
    const totalminute = diff + differenceInSeconds + sum;
    setDestination(destination + totaldis);
    setWaitingtime(totalminute);
    const data = {
      customer_cognito_id: operator_cognito_id,
      passengers: passenger,
      total_travel_miles: (totaldis * 0.000621371).toFixed(2),
      total_waiting_mins: totalminute / 60,
    };
    if (eventType) {
      dispatch(requestReserv(data));
      navigate("/cost");
      setTyeError("");
    } else {
      setTyeError("Enter select event type");
    }
  };

  return (
    <div>
      <HeaderSecond />
      <section class="costbg">
        <div class="costLft">
          <div class="costinn">
            <div class="bookingNavigate costnavigate">
              <button class="active">
                <span>Trip</span>
              </button>
              <button class="">
                <span>Cost</span>
              </button>
              <button>
                <span>Reserve</span>
              </button>
            </div>
            <div class="">
              <div class="reservationTrip">
                <div class="mapadd2 addressLocate">
                  <span class="mapbox2"></span>
                  <label>
                    <span>*</span>Day for the pickup
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    value={departureDate}
                    min={getCurrentDate()}
                    onChange={(selectdate) =>
                      setDepartureDate(selectdate.target.value)
                    }
                  />
                </div>
                <div class="mapadd2 addressLocate">
                  <span class="mapbox2"></span>
                  <label>
                    <span>*</span>Departure
                  </label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    placeholder="Washington D.C., DC, USA"
                    disabled={!departureDate || keyValue}
                    value={departurePlace}
                    onChange={(event) => (
                      setDeparturePlace(event.target.value), setShowList(true)
                    )}
                  />
                  <ul className="list-group listclass">
                    {showList &&
                      searchList.length != 0 &&
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
                  {departurePlace && (
                    <div class="row">
                      <div class="col-md-6">
                        <label>
                          <span>*</span>Arriving Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          placeholder=""
                          min={currentTime}
                          value={arrivaltime}
                          disabled={!departurePlace}
                          onChange={(event) =>
                            setArrivaltime(event.target.value)
                          }
                        />
                      </div>
                      <div class="col-md-6">
                        <label>
                          <span>*</span>Leaving Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          value={leavingTime}
                          disabled={!arrivaltime}
                          onChange={(event) =>
                            handleLeavingTime(event.target.value)
                          }
                        />
                        {leavingTimeError && (
                          <span style={{ color: "red" }}>
                            {leavingTimeError}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div class="addNote">
                    add Note <img src={note} />
                    <div class="notewrite">
                      <textarea rows="" cols=""></textarea>
                    </div>
                  </div>
                </div>
                {leavingTime && (
                  <div class="mapadd2 addressLocate">
                    <span class="mapbox2"></span>
                    <label>
                      <span>*</span>Destination{count.length != 0 ? "1" : ""}
                    </label>
                    <input
                      type="text"
                      name="place"
                      disabled={!leavingTime || keyValue}
                      value={destination}
                      class="form-control mb-3"
                      placeholder="Washington D.C., DC, USA"
                      onChange={(event) => handleDestinationStart(event)}
                    />
                    <ul className="list-group listclass">
                      {showDes &&
                        destinationSearchList.length != 0 &&
                        destinationSearchList.map((data, i) => (
                          <li
                            key={i}
                            value={data?.place_id}
                            className="list-group-item"
                            onClick={() => handleDestination(data)}
                          >
                            {data.description}
                          </li>
                        ))}
                    </ul>
                    <div class="row">
                      <div class="col-md-6">
                        <label>
                          <span>*</span>Drop-off time
                        </label>
                        <input
                          type="time"
                          name="droptime"
                          value={dropOffTime}
                          readOnly
                          class="form-control"
                          placeholder=""
                        />
                      </div>
                      {keyValue && (
                        <div class="col-md-6">
                          <label>
                            <span>*</span>Leaving Time
                          </label>
                          <input
                            type="time"
                            name="droptime"
                            value={lastleavingtime}
                            class="form-control"
                            placeholder=""
                            onChange={(e) => handleLastLeavTime(e)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="removecontainer">
                      <div class="addNote">
                        add Note <img src={note} />
                        <div class="notewrite">
                          <textarea rows="" cols=""></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {count.length != 0 &&
                  count.map((data, key) => {
                    return (
                      <div class="mapadd2 addressLocate">
                        <span class="mapbox2"></span>
                        <label>
                          <span>*</span>Destination ({key + 2})
                          {/* {data === keyValue && (
                            <span
                              style={{ color: "red" }}
                              onClick={() => remove(data)}
                            >
                              <img
                                src={cross}
                                alt="cross"
                                style={{ height: "15px" }}
                              />
                            </span>
                          )} */}
                        </label>
                        <input
                          type="text"
                          key={data}
                          name="place"
                          disabled={
                            data != keyValue ||
                            (data === "A"
                              ? !lastleavingtime
                              : !formData[count[count.length - 2]]?.leavingtime)
                          }
                          value={formData ? formData[data]?.place : ""}
                          class="form-control mb-3"
                          placeholder="Washington D.C., DC, USA"
                          onChange={(event) => handleChangeInput(event, data)}
                        />
                        <ul className="list-group listclass">
                          {formData &&
                            formData[data]?.searchList &&
                            formData[data]?.searchList.length != 0 &&
                            formData[data]?.show &&
                            formData[data]?.searchList.map((item, i) => (
                              <li
                                key={i}
                                value={item?.place_id}
                                className="list-group-item"
                                onClick={() =>
                                  handleDepartureSelectSearch(item, data)
                                }
                              >
                                {item?.description}
                              </li>
                            ))}
                        </ul>
                        <div class="row">
                          <div class="col-md-6">
                            <label>
                              <span>*</span>Drop-off time
                            </label>
                            <input
                              type="time"
                              name="droptime"
                              readOnly
                              key={data}
                              value={formData ? formData[data]?.droptime : ""}
                              disabled={
                                formData ? !formData[data]?.place : true
                              }
                              class="form-control"
                              placeholder=""
                              onChange={(event) =>
                                handleChangeInput(event, data)
                              }
                            />
                          </div>
                          {count && keyValue != count[key] && (
                            <div class="col-md-6">
                              <label>
                                <span>*</span>Leaving time
                              </label>
                              <input
                                type="time"
                                name="leavingtime"
                                key={data}
                                value={
                                  formData ? formData[data]?.leavingtime : ""
                                }
                                disabled={
                                  formData ? !formData[data]?.place : true
                                }
                                class="form-control"
                                placeholder=""
                                onChange={(event) =>
                                  handleChangeInput(event, data)
                                }
                              />
                            </div>
                          )}
                        </div>
                        <div className="removecontainer">
                          <div class="addNote">
                            add Note <img src={note} />
                            <div class="notewrite">
                              <textarea rows="" cols=""></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {dropOffTime && count.length === 0 ? (
                  <div class="costMiddle">
                    <button class="commonButton" onClick={() => addmore()}>
                      Add Next Stop
                    </button>
                  </div>
                ) : formData &&
                  keyValue &&
                  formData[keyValue] &&
                  formData[keyValue].droptime ? (
                  <div class="costMiddle">
                    <button class="commonButton" onClick={() => addmore()}>
                      Add Next Stop
                    </button>
                  </div>
                ) : null}
              </div>

              {/* <div class="smallHdn">
                <span>*</span> Create a new day trip or pickup from diffrent
                location?
              </div>
              <div class="tripBtn">
                <button
                  class="commonButton"
                  onClick={() => navigate("/reservationTipYes")}
                >
                  Yes
                </button>
                <button class="commonButton nobtn" onclick="noToggle()">
                  No
                </button>
              </div> */}
              <div class=" costB" id="contDrop">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label>
                      <span>*</span> Event Type
                    </label>
                    <select
                      class="form-control"
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <option>Select</option>
                      {state?.type.length != 0 &&
                        state?.type.map((data, index) => (
                          <option
                            key={index}
                            value={
                              data?.ReservationEventType
                                ?.reservationeventtype_id
                            }
                          >
                            {
                              data?.ReservationEventType
                                ?.reservationeventtype_name
                            }
                          </option>
                        ))}
                    </select>
                    {typeError && (
                      <span style={{ color: "red" }}>{typeError}</span>
                    )}
                  </div>
                  <div class="col-md-6">
                    <label>
                      <span>*</span> How Many Passenger?
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      value={passenger}
                      placeholder="Number of passenger"
                      onChange={(e) => setPassanger(e.target.value)}
                    />
                  </div>
                </div>
                <div class="costMiddle nopdn">
                  <button
                    class="commonButton"
                    onClick={() => handleContinue()}
                    disabled={!passenger || !dropOffTime}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="costMap" style={{ width: "100%", height: "100vh" }}>
          <div class="mapContainer">
            <Map
              google={google}
              zoom={8}
              initialCenter={
                mapOptions?.center || { lat: 39.8283, lng: -98.5795 }
              }
              // bounds={usaBounds}
            >
              {directions && directions.overview_path && (
                <Polyline
                  path={directions.overview_path.map((point) => ({
                    lat: point.lat(),
                    lng: point.lng(),
                  }))}
                  strokeColor="blue"
                  strokeOpacity={0.8}
                  strokeWeight={5}
                />
              )}
              {originCoords && (
                <Marker
                  position={{
                    lat: originCoords.lat(),
                    lng: originCoords.lng(),
                  }}
                  label=""
                />
              )}
              {/* Marker for ending point (Point B) */}
              {/* {destinationCoords && (
                <Marker
                  position={{
                    lat: destinationCoords.lat(),
                    lng: destinationCoords.lng(),
                  }}
                  label={``}
                />
              )} */}

              {waypointsCoords.length != 0 &&
                waypointsCoords.map((waypoint, index) => (
                  <Marker
                    key={index}
                    position={{ lat: waypoint.lat, lng: waypoint.lng }}
                    label={`${index + 1}`}
                  />
                ))}
            </Map>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU",
})(ReservationTrip);
