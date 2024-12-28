import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  activity: [],
  error: "",
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,

  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.activity = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.activity = action.payload;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.activity = [];
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = activitySlice.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const { data } = await axios.get(`http://localhost:3000/activity`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchReject(error));
  }
};

export default activitySlice.reducer;
