import { configureStore } from "@reduxjs/toolkit";
import garageSlice from "./garageSlice";
import vehicleslice from "./vehicleslice";
import teamSlice from "./teamSlice";
import rateSlice from "./rateSlice";
import reservationSlice from "./reservationSlice";

export const store = configureStore({
  reducer: {
    garage: garageSlice,
    vehicle: vehicleslice,
    team: teamSlice,
    rate: rateSlice,
    reservation: reservationSlice,
  },
});
