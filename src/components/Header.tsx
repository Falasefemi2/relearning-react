import type { RootState } from "@/services/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { toggleAddForm } from "@/services/uiSlice";
import { Plus } from "lucide-react";

const Header = () => {
    const dispatch = useDispatch();
    const { showAddForm } = useSelector((state: RootState) => state.ui);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
                    <p className="text-gray-600 mt-1">Stay organized and productive</p>
                </div>

                <Button
                    onClick={() => dispatch(toggleAddForm())}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    {showAddForm ? 'Cancel' : 'Add Task'}
                </Button>
            </div>
        </div>
    )
}

export default Header