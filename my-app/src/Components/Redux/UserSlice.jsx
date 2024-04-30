import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userDetails: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    register: (state, action) => {
      console.log("userSlice", action.payload);
      state.userDetails = action.payload;
      console.log(state.userDetails);
    },
  },
});

export const { register, fndlocation } = UserSlice.actions;
export default UserSlice.reducer;
