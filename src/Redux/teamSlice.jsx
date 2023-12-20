import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOperatorTeam,
  allOperatorTeamType,
  addOperatorTeam,
  getSpecificTeamDetatails,
  updateSpecificTeamData,
} from "../Service/apis";

export const fetchTeam = createAsyncThunk("fetchTeam", async (data) => {
  const response = await getOperatorTeam(data);
  return response.data;
});
export const fetchTeamOperatorType = createAsyncThunk(
  "fetchTeamOperatorType",
  async () => {
    const response = await allOperatorTeamType();
    return response.data;
  }
);
export const addTeam = createAsyncThunk("addTeam", async (data) => {
  const response = await addOperatorTeam(data);
  return response;
});
export const specificTeam = createAsyncThunk("specificTeam", async (data) => {
  const { operator_cognito_id, id } = data;
  const response = await getSpecificTeamDetatails(operator_cognito_id, id);
  return response.data[0];
});
export const updatespecificTeam = createAsyncThunk(
  "updatespecificTeam",
  async (params) => {
    const { data, operator_cognito_id, id } = params;
    const response = await updateSpecificTeamData(
      data,
      operator_cognito_id,
      id
    );
    return response;
  }
);

const initialState = {
  isLoading: true,
  isError: false,
  data: [],
  type: [],
  specificTeamData: null,
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTeam.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTeam.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(fetchTeamOperatorType.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTeamOperatorType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.type = action.payload;
    });
    builder.addCase(fetchTeamOperatorType.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(addTeam.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addTeam.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addTeam.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(specificTeam.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(specificTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.specificTeamData = action.payload;
    });
    builder.addCase(specificTeam.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
    builder.addCase(updatespecificTeam.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatespecificTeam.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updatespecificTeam.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = teamSlice.actions;

export default teamSlice.reducer;
