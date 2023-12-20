import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllVechicleData,
  addVehicleData,
  getVechicletype,
  getSpecificVehicleData,
  updateSpecificVehicleData,
} from "../Service/apis";

export const fetchVehicle = createAsyncThunk("fetchVehicle", async (data) => {
  const response = await getAllVechicleData(data);
  return response.data;
});
export const addVehicle = createAsyncThunk("addVehicle", async (data) => {
  const response = await addVehicleData(data);
  return response.data;
});
export const vehicleType = createAsyncThunk("vehicleType", async () => {
  const response = await getVechicletype();
  return response.data;
});
export const specificVehicle = createAsyncThunk(
  "specificVehicle",
  async (data) => {
    const { operator_cognito_id, id } = data;
    const response = await getSpecificVehicleData(operator_cognito_id, id);
    return response.data[0];
  }
);
export const updateVehicle = createAsyncThunk(
  "updateVehicle",
  async (params) => {
    const { data, operator_cognito_id, id } = params;
    const response = await updateSpecificVehicleData(
      data,
      operator_cognito_id,
      id
    );
    return response;
  }
);

export const vehicleslice = createSlice({
  name: "vehicle",
  initialState: {
    isLoading: true,
    isError: false,
    data: [],
    type: [],
    specificVehicleData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVehicle.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchVehicle.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(addVehicle.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addVehicle.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(vehicleType.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(vehicleType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.type = action.payload;
    });
    builder.addCase(vehicleType.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(specificVehicle.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(specificVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.specificVehicleData = action.payload;
    });
    builder.addCase(specificVehicle.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(updateVehicle.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateVehicle.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export const {} = vehicleslice.actions;

export default vehicleslice.reducer;
