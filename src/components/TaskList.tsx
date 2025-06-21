import selectFilteredTasks from "@/services/selectors";
import { fetchTasks } from "@/services/service";
import type { AppDispatch, RootState } from "@/services/store";
import { Filter } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";


const TaskList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector(selectFilteredTasks);
    const { loading, error } = useSelector((state: RootState) => state.tasks);

    React.useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-600">
                Error loading tasks: {error}
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <Filter size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No tasks found. Try adjusting your filters or add a new task.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default TaskList