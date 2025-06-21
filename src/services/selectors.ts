/** @format */

import type { Task } from "./slice";
import type { RootState } from "./store";

const selectFilteredTasks = (state: RootState): Task[] => {
  const { items, filter, searchTerm } = state.tasks;

  let filtered: Task[] = items;

  // Apply filter
  if (filter === "completed") {
    filtered = filtered.filter((task: Task) => task.completed);
  } else if (filter === "pending") {
    filtered = filtered.filter((task: Task) => !task.completed);
  }

  // Apply search
  if (searchTerm) {
    filtered = filtered.filter(
      (task: Task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
};

export default selectFilteredTasks;
