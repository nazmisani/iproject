import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  activities: [],
  loading: false,
  error: "",
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,

  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.activities = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.activities = action.payload || [];
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.activities = [];
      state.error = action.payload || "Failed to fetch activities";
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = activitySlice.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const access_token = localStorage.getItem("access_token") || "";
    const response = await axios.get("http://localhost:3000/activity", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const activities = response.data.activities || [];
    dispatch(fetchSuccess(activities));
  } catch (error) {
    console.error("Error fetching activity:", error);
    const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
    dispatch(fetchReject(errorMessage));
  }
};

export default activitySlice.reducer;
