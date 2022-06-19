import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { setLocalUser } from "../../localStorage";
import { api } from "../../service";
import { setLocalFeedbacks } from "../../storage";
import { User } from "../type";

const INITIAL_STATE: User = {};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    loadLocalUser: (_state, action) => {
      return action.payload;
    },
    selectSchool: (state, action) => {
      const newState = { ...state, selectedSchool: action.payload };
      setLocalUser(newState);
      return newState;
    },
    logout: () => {
      setLocalFeedbacks([]);
      setLocalUser(INITIAL_STATE);
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      setLocalUser(action.payload);
      return { ...state, ...action.payload };
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export const { selectSchool, loadLocalUser, logout } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
