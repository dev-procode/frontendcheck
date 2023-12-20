import React from "react";
import "../src/styles/style.css";
import "../src/styles/media.css";
import Login from "./Main/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Main/Auth/SignUp";
import Home from "./Main/Home/Home";
import Today from "../src/Operator/Adjustment/Today/Today";
import Marketplace from "../src/Operator/Adjustment/Marketplace/Marketplace";
import Booking from "./Operator/Adjustment/Booking/Booking";
import Upcoming from "./Operator/Adjustment/Booking/Upcoming";
import Availability from "./Operator/Adjustment/Availlability/Availability";
import Company from "./Operator/Adjustment/More/Company";
import Garages from "./Operator/Adjustment/More/Garages";
import Rates from "./Operator/Adjustment/More/Rates";
import Team from "./Operator/Adjustment/More/Team";
import Vehicles from "./Operator/Adjustment/More/Vehicles";
import ReservationTipYes from "./Customer/Reservation/ReservationTipYes";
import ReservationTrip from "./Customer/Reservation/ReservationTrip";
import Reserved from "./Customer/Reservation/Reserved";
import Map from "./Operator/Map/Map";
import MapSecond from "./Operator/Map/MapSecond";
import Cost from "./Customer/Reservation/Cost";
import CostSecond from "./Customer/Reservation/CostSecond";
import AddAdjustment from "./Operator/Adjustment/More/AddAdjustment";
import AddGarages from "./Operator/Adjustment/More/AddGarages";
import AddMinimum from "./Operator/Adjustment/More/AddMinimum";
import AddTeamUser from "./Operator/Adjustment/More/AddTeamUser";
import AddVehicles from "./Operator/Adjustment/More/AddVehicles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GarageDetails from "./Operator/Adjustment/More/GarageDetails";
import Forgetpassword from "./Main/Auth/Forgetpassword";
import VehicleDetails from "./Operator/Adjustment/More/VehicleDetails";
import TeamDetails from "./Operator/Adjustment/More/TeamDetails";
import EditCompany from "./Operator/Adjustment/More/EditCompany";
import CustomerLogin from "./Main/Auth/CustomerLogin";
import CustomerSignUp from "./Main/Auth/CustomerSignUp";
import CustomerForgetpassword from "./Main/Auth/CustomerForgetPassword";
import LoginBoth from "./Main/Auth/BothLogin";

function App() {
  // const store = configureStore();
  const idToken = localStorage.getItem("idToken");
  const company_name = localStorage.getItem("company_name");
  console.log("company_name", company_name);
  return (
    <>
      {/* <Provider store={store}> */}
      <ToastContainer />
      <Router>
        <Routes>
          {idToken ? (
            <>
              {company_name ? (
                <>
                  <Route exact path="/" element={<Today />}></Route>
                  <Route
                    exact
                    path="/operator/today"
                    element={<Today />}
                  ></Route>
                  <Route exact path="/home" element={<Home />}></Route>
                  <Route
                    exact
                    path="/operator/today"
                    element={<Today />}
                  ></Route>

                  <Route
                    exact
                    path="/operator/marketplace"
                    element={<Marketplace />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/booking"
                    element={<Booking />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/booking/upcoming"
                    element={<Upcoming />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/availability"
                    element={<Availability />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/company"
                    element={<Company />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/garages"
                    element={<Garages />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/rates"
                    element={<Rates />}
                  ></Route>
                  <Route exact path="/operator/team" element={<Team />}></Route>
                  <Route
                    exact
                    path="/operator/team/details"
                    element={<TeamDetails />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/vehicles"
                    element={<Vehicles />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/rates/addAdjustment"
                    element={<AddAdjustment />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/garages/addGarages"
                    element={<AddGarages />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/garages/details"
                    element={<GarageDetails />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/rates/minimum"
                    element={<AddMinimum />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/team/teamuser"
                    element={<AddTeamUser />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/vehicles/addVehicle"
                    element={<AddVehicles />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/vehicles/vehicledetails"
                    element={<VehicleDetails />}
                  ></Route>
                  <Route
                    exact
                    path="/operator/company/companydetails"
                    element={<EditCompany />}
                  ></Route>
                  <Route exact path="*" element={<Home />} />
                </>
              ) : (
                <>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route
                    exact
                    path="/reservationTipYes"
                    element={<ReservationTipYes />}
                  ></Route>
                  <Route
                    exact
                    path="/reservationTrip"
                    element={<ReservationTrip />}
                  ></Route>
                  <Route exact path="/reserved" element={<Reserved />}></Route>
                  <Route exact path="/map1" element={<Map />}></Route>
                  <Route exact path="/map2" element={<MapSecond />}></Route>
                  <Route exact path="/cost" element={<Cost />}></Route>
                  <Route exact path="/cost2" element={<CostSecond />}></Route>
                  <Route exact path="*" element={<Home />} />
                </>
              )}
            </>
          ) : (
            <>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/userlogin" element={<LoginBoth />}></Route>
              <Route
                exact
                path="/customerlogin"
                element={<CustomerLogin />}
              ></Route>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>
              <Route
                exact
                path="/customersignup"
                element={<CustomerSignUp />}
              ></Route>
              <Route
                exact
                path="/forgotpassword"
                element={<Forgetpassword />}
              ></Route>
              <Route
                exact
                path="/customerforgotpassword"
                element={<CustomerForgetpassword />}
              ></Route>
              <Route exact path="*" element={<Login />} />
              <Route
                exact
                path="/reservationTrip"
                element={<CustomerLogin />}
              />
              <Route
                exact
                path="/reservationTipYes"
                element={<CustomerLogin />}
              />
              <Route exact path="/cost" element={<CustomerLogin />} />
              <Route exact path="/reserved" element={<CustomerLogin />} />
              <Route exact path="/cost" element={<CustomerLogin />} />
              <Route exact path="/cost2" element={<CustomerLogin />} />
              <Route exact path="/map1" element={<CustomerLogin />} />
              <Route exact path="/map2" element={<CustomerLogin />} />
            </>
          )}
        </Routes>
      </Router>
      {/* </Provider> */}
    </>
  );
}

export default App;
