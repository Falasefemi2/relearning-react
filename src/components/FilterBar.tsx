import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/services/store";
import { setFilter, setSearchTerm, type Task } from "@/services/slice";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const FilterBar = () => {
    const dispatch = useDispatch();
    const { filter, searchTerm } = useSelector((state: RootState) => state.tasks);
    const taskCount = useSelector((state: RootState) => state.tasks.items.length);
    const completedCount = useSelector((state: RootState) =>
        state.tasks.items.filter((task: Task) => task.completed).length
    );
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2">
                    {(['all', 'pending', 'completed'] as const).map((filterType) => (
                        <Button
                            key={filterType}
                            onClick={() => dispatch(setFilter(filterType))}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === filterType
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                        </Button>
                    ))}
                </div>

                <div className="flex icons-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="text-sm text-gray-600">
                        {completedCount} / {taskCount} completed
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar