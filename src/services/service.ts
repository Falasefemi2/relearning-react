/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "./slice";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      {
        id: 1,
        title: "Setup Redux Toolkit",
        completed: true,
        priority: "high",
        category: "development",
      },
      {
        id: 2,
        title: "Build task components",
        completed: false,
        priority: "medium",
        category: "development",
      },
      {
        id: 3,
        title: "Add filtering functionality",
        completed: false,
        priority: "low",
        category: "feature",
      },
    ];
  }
);
