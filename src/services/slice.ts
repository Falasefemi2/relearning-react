/** @format */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./service";

// Task type
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  category: string;
}

export interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
  filter: "all" | "completed" | "pending";
  searchTerm: string;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
  filter: "all",
  searchTerm: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        priority?: TaskPriority;
        category?: string;
      }>
    ) => {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
        priority: action.payload.priority ?? "medium",
        category: action.payload.category ?? "general",
      };
      state.items.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.items.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Omit<Task, "id">> }>
    ) => {
      const { id, updates } = action.payload;
      const task = state.items.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    setFilter: (state, action: PayloadAction<TasksState["filter"]>) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  updateTask,
  setFilter,
  setSearchTerm,
} = tasksSlice.actions;

export default tasksSlice.reducer;
