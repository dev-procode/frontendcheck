import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllReservationType ,requestReservation} from "../Service/apis";

export const fetchType = createAsyncThunk("fetchType", async () => {
  const response = await getAllReservationType();
  return response.data;
});
export const requestReserv = createAsyncThunk("requestReserv", async (data) => {
  const response = await requestReservation(data);
  return response.data;
});

const initialState = {
  isLoading: true,
  isError: false,
  data: [],
  type: [],
  details:[]
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchType.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.type = action.payload;
    });
    builder.addCase(fetchType.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(requestReserv.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(requestReserv.fulfilled, (state, action) => {
      state.isLoading = false;
      state.details = action.payload;
    });
    builder.addCase(requestReserv.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = reservationSlice.actions;

export default reservationSlice.reducer;
