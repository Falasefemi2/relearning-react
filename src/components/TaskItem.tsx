import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { deleteTask, toggleTask } from "@/services/slice";
import { Check, Edit, Trash2 } from "lucide-react";
import { setEditingTask } from "@/services/uiSlice";
import type { Task } from "@/services/slice";

const TaskItem = ({ task }: { task: Task }) => {
    const dispatch = useDispatch();

    const priorityColors = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };

    return (
        <div className={`p-4 rounded-lg border transition-all ${task.completed ? 'bg-gray-50 opacity-75' : 'bg-white shadow-sm hover:shadow-md'
            }`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                    <Button
                        onClick={() => dispatch(toggleTask(task.id))}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-400'
                            }`}
                    >
                        {task.completed && <Check size={12} />}
                    </Button>

                    <div className="flex-1">
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.title}
                        </h3>
                        <div className="flex gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                                {task.priority}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {task.category}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => dispatch(setEditingTask(task))}
                    >
                        <Edit size={16} />
                    </Button>
                    <Button
                        onClick={() => dispatch(deleteTask(task.id))}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem