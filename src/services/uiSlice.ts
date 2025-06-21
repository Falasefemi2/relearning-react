/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showAddForm: false,
    editingTask: null,
    theme: "light",
  },
  reducers: {
    toggleAddForm: (state) => {
      state.showAddForm = !state.showAddForm;
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleAddForm, setEditingTask, toggleTheme } = uiSlice.actions;

export default uiSlice.reducer;
