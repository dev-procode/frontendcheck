import { userInstance } from "./Service";

export const addGarage = (data) => {
  return userInstance("POST", "add-garage-by-operator", data);
};
export const getGarageAllData = (data) => {
  return userInstance("GET", "get-all-garages-by-operator", `/${data}`);
};
export const getSpecificGarageData = (data, id) => {
  return userInstance(
    "GET",
    "get-specific-garage-by-operator",
    `/${data}`,
    `/${id}`
  );
};
export const getVechicletype = () => {
  return userInstance("GET", "get-all-vehicletype", "");
};
export const getAllVechicleData = (data) => {
  return userInstance("GET", "get-all-vehicles-by-operator", `/${data}`);
};
export const addVehicleData = (data) => {
  return userInstance("POST", "add-vehicle-by-operator", data);
};
export const getSpecificVehicleData = (data, id) => {
  return userInstance(
    "GET",
    "get-specific-vehicle-by-operator",
    `/${data}`,
    `/${id}`
  );
};
export const updateSpecificVehicleData = (data, id, index) => {
  return userInstance(
    "PATCH",
    "update-vehicle-by-operator",
    data,
    `/${id}`,
    `/${index}`
  );
};
export const allOperatorTeamType = () => {
  return userInstance("GET", "get-all-operatorteamtype", "");
};
export const addOperatorTeam = (data) => {
  return userInstance("POST", "add-operatorteam", data);
};
export const getOperatorTeam = (data) => {
  return userInstance("GET", "get-all-operatorteam-by-operator", `/${data}`);
};
export const getSpecificTeamDetatails = (data, id) => {
  return userInstance(
    "GET",
    "get-specific-operatorteam-by-operator",
    `/${data}`,
    `/${id}`
  );
};
export const updateSpecificTeamData = (data, id, index) => {
  return userInstance(
    "PATCH",
    "update-operatorteam-by-operator",
    data,
    `/${id}`,
    `/${index}`
  );
};
export const getCheckGarage = (data, id) => {
  return userInstance(
    "GET",
    "check-garage-vehicle-by-operator",
    `/${data}`,
    `/${id}`
  );
};
export const addCompany = (data) => {
  return userInstance("POST", "add-operatorcompany", data);
};
export const getSpecificCompanyData = (data, id) => {
  return userInstance(
    "GET",
    "get-specific-operatorcompany-by-operator",
    `/${data}`,
    `/${id}`
  );
};
export const getOperatorCompany = (data) => {
  return userInstance(
    "GET",
    "get-specific-operatorcompany-by-operator",
    `/${data}`
  );
};
export const updateSpecificCompany = (data, id, index) => {
  return userInstance(
    "PATCH",
    "update-operatorcompany-by-operator",
    data,
    `/${id}`,
    `/${index}`
  );
};
export const addRates = (data) => {
  return userInstance("POST", "add-operatorrate", data);
};
export const getAllRates = (data) => {
  return userInstance("GET", "get-all-operatorrate-by-operator", `/${data}`);
};
export const getSpecificRateData = (data, id) => {
  return userInstance(
    "GET",
    "get-specific-operatorrate-by-operator",
    `/${data}`,
    `/${id}`
  );
};
export const updateSpecificRates = (data, id, index) => {
  return userInstance(
    "PATCH",
    "update-operatorrate-by-operator",
    data,
    `/${id}`,
    `/${index}`
  );
};
export const getRateVehicle = (data) => {
  return userInstance(
    "GET",
    "get-rate-assigned-vehicles-by-operator",
    `/${data}`
  );
};
export const addOperatoradjustment = (data) => {
  return userInstance("POST", "add-operatoradjustment", data);
};
export const getAdjusmentDataAll = (data) => {
  return userInstance(
    "GET",
    "get-all-operatoradjustment-by-operator",
    `/${data}`
  );
};
export const getSpecificAdjustmentData = (data, id) => {
  return userInstance(
    "GET",
    "get-specific-operatoradjustment-by-operator",
    `/${data}`,
    `/${id}`
  );
};
export const updateSpecificAdjustment = (data, id, index) => {
  return userInstance(
    "PATCH",
    "update-operatoradjustment-by-operator",
    data,
    `/${id}`,
    `/${index}`
  );
};
export const getAllReservationType = () => {
  return userInstance("GET", "get-all-reservationeventtype", "");
};
export const requestReservation = (data) => {
  return userInstance("POST", "reservation-request", data);
};
