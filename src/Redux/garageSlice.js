import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGarageAllData,
  addGarage,
  getSpecificGarageData,
} from "../Service/apis";

export const fetchGarage = createAsyncThunk("fetchGarage", async (data) => {
  const response = await getGarageAllData(data);
  return response.data;
});
export const GarageAdd = createAsyncThunk("GarageAdd", async (data) => {
  const response = await addGarage(data);
  return response;
});
export const sepecificGarage = createAsyncThunk(
  "sepecificGarage",
  async (data) => {
    const { operator_cognito_id, id } = data;
    const response = await getSpecificGarageData(operator_cognito_id, id);
    return response.data[0]?.Garage;
  }
);

const initialState = {
  isLoading: true,
  isError: false,
  data: [],
  specificGarageData: null,
};

export const garageSlice = createSlice({
  name: "garage",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGarage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGarage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchGarage.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(GarageAdd.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(GarageAdd.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(GarageAdd.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(sepecificGarage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sepecificGarage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.specificGarageData = action.payload;
    });
    builder.addCase(sepecificGarage.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = garageSlice.actions;

export default garageSlice.reducer;
