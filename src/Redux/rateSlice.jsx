import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllRates,
  getAdjusmentDataAll,
  addOperatoradjustment,
  getRateVehicle,
  getSpecificAdjustmentData,
  getSpecificRateData,
  updateSpecificAdjustment,
  updateSpecificRates,
} from "../Service/apis";

export const fetchRate = createAsyncThunk("fetchRate", async (data) => {
  const response = await getAllRates(data);
  return response.data;
});
export const fetchAdjustment = createAsyncThunk(
  "fetchAdjustment",
  async (data) => {
    const response = await getAdjusmentDataAll(data);
    return response.data;
  }
);
export const addAdjustment = createAsyncThunk("addAdjustment", async (data) => {
  const response = await addOperatoradjustment(data);
  return response;
});
export const vehicleRate = createAsyncThunk("vehicleRate", async (data) => {
  const response = await getRateVehicle(data);
  return response.data;
});
export const specificAdjustmentData = createAsyncThunk(
  "specificAdjustmentData",
  async (data) => {
    const { operator_cognito_id, editId } = data;
    const response = await getSpecificAdjustmentData(
      operator_cognito_id,
      editId
    );
    return response.data[0]?.OperatorAdjustment;
  }
);
export const specificRates = createAsyncThunk("specificRates", async (data) => {
  const { operator_cognito_id, id } = data;
  const response = await getSpecificRateData(operator_cognito_id, id);
  return response.data[0].OperatorRate;
});
export const updateAdjusment = createAsyncThunk(
  "updateAdjusment",
  async (params) => {
    const { data, operator_cognito_id, editId } = params;
    const response = await updateSpecificAdjustment(
      data,
      operator_cognito_id,
      editId
    );
    return response;
  }
);
export const updateRatesData = createAsyncThunk("updateRatesData", async (params) => {
  const { data, operator_cognito_id, rateId } = params;
  const response = await updateSpecificRates(data, operator_cognito_id, rateId);
  return response;
});

const initialState = {
  isLoading: true,
  isError: false,
  data: [],
  adjustment: [],
  vehiclerate: [],
  specificRateData: null,
  specificAdjustData: null,
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchRate.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(fetchAdjustment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAdjustment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adjustment = action.payload;
    });
    builder.addCase(fetchAdjustment.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(addAdjustment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAdjustment.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addAdjustment.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(vehicleRate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(vehicleRate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehiclerate = action.payload;
    });
    builder.addCase(vehicleRate.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(specificAdjustmentData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(specificAdjustmentData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.specificAdjustData = action.payload;
    });
    builder.addCase(specificAdjustmentData.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(specificRates.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(specificRates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.specificRateData = action.payload;
    });
    builder.addCase(specificRates.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(updateAdjusment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAdjusment.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateAdjusment.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(updateRatesData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateRatesData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateRatesData.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = rateSlice.actions;

export default rateSlice.reducer;
