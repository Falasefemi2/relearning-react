import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAddForm, setEditingTask } from '../services/uiSlice';
import { addTask, updateTask } from '@/services/slice';

import type { Task, TaskPriority } from '@/services/slice';
import type { RootState } from '@/services/store';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from './ui/select';
import { Button } from './ui/button';



const TaskForm = () => {
    const dispatch = useDispatch();
    const { showAddForm, editingTask } = useSelector((state: RootState) => state.ui) as {
        showAddForm: boolean;
        editingTask: Task | null;
    };
    const [formData, setFormData] = useState<{
        title: string;
        priority: TaskPriority;
        category: string;
    }>({
        title: '',
        priority: 'medium',
        category: 'general'
    });

    React.useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title,
                priority: editingTask.priority,
                category: editingTask.category
            });
        } else {
            setFormData({ title: '', priority: 'medium', category: 'general' });
        }
    }, [editingTask]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        if (editingTask) {
            dispatch(updateTask({ id: editingTask.id, updates: formData }));
            dispatch(setEditingTask(null));
        } else {
            dispatch(addTask(formData));
        }

        setFormData({ title: '', priority: 'medium', category: 'general' });
        dispatch(toggleAddForm());
    };

    if (!showAddForm && !editingTask) return null;



    return (
        <div className="bg-white p-4 rounded-lg shadow-md border mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                {editingTask ? 'Edit Task' : 'Add New Task'}
            </h3>
            <div className='space-y-3'>
                <Input
                    type='text'
                    placeholder="Task title..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <div className='flex gap-3'>
                    <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value as TaskPriority })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="low">Low Priority</SelectItem>
                                <SelectItem value="medium">Medium Priority</SelectItem>
                                <SelectItem value="high">High Priority</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="development">Development</SelectItem>
                                <SelectItem value="feature">Feature</SelectItem>
                                <SelectItem value="bug">Bug</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className='flex gap-2'>
                        <Button onClick={handleSubmit}>{editingTask ? 'Update Task' : 'Add Task'}</Button>
                        <Button variant="secondary" onClick={() => {
                            dispatch(toggleAddForm());
                            dispatch(setEditingTask(null));
                        }}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskForm