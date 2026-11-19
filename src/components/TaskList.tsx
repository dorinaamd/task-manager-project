import React, { useState } from 'react';
import { Importance, Label, Task } from '../interfaces/Task';

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: string) => void;
    onDeleteTask: (title: string) => void;
    onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDeleteTask, onEditTask }) => {


    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editImportance, setEditImportance] = useState<Importance>('Low');
    const [editLabel, setEditLabel] = useState<Label>('Work');

    const handleEdit = (task: Task) => {
        setIsEditing(task.id);
        setEditTitle(task.title);
        setEditDescription('');
        setEditImportance('Low');
        setEditLabel('Hobby');
    };

    const handleSaveEdit = (id: string) => {
        onEditTask({
            id,
            title: editTitle,
            description: editDescription,
            importance: editImportance,
            label: editLabel,
            completed: false
        });
        setIsEditing(null);
    };

    return (
        <div className="task-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {tasks.map(task => (
                <div
                    key={task.id}
                    className={`task-item p-4 border border-slate-200 rounded-lg shadow-sm ${task.completed ? 'bg-slate-200' : 'bg-slate-100'}`}
                >
                    {isEditing === task.id ? (
                        <div>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="block w-full mb-2 p-1 border rounded-md"
                                placeholder="Title"
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="block w-full mb-2 p-1 border rounded-md"
                                placeholder="Description"
                            />
                            <select
                                value={task.importance}
                                onChange={(e) => setEditImportance(e.target.value as Importance)}
                                className="block w-full mb-2 p-1 border rounded-md"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <select
                                value={task.label}
                                onChange={(e) => setEditLabel(e.target.value as Label)}
                                className="block w-full mb-2 p-1 border rounded-md"
                            >
                                <option value="Work">Work</option>
                                <option value="Social">Social</option>
                                <option value="Home">Home</option>
                                <option value="Hobby">Hobby</option>
                            </select>
                            <button
                                onClick={() => handleSaveEdit(task.id)}
                                className="py-1 px-2 bg-indigo-600 text-white rounded-md"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(null)
                                    if (!task.completed) {
                                        onToggleComplete(task.id)
                                    }
                                }}
                                className="py-1 px-2 bg-slate-500 text-white rounded-md ml-2 cursor-text"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <p className="text-sm">{task.description}</p>
                            <p className="text-xs text-slate-500">Importance: {task.importance}</p>
                            <p className="text-xs text-slate-500">Category: {task.label}</p>
                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() => onToggleComplete(task.id)}
                                    className={`py-1 px-2 text-xs rounded-md text-white ${task.completed ? 'bg-purple-500' : 'bg-teal-500 hover:bg-teal-600'}`}
                                >
                                    {task.completed ? 'Mark Undone' : 'Mark Done'}
                                </button>
                                <button
                                        //// BUG: se trimite titlul, care nu e unic; ar trebui un id unic al task-ului
                                    onClick={() => onDeleteTask(task.title)} 
                                    className="py-1 px-2 text-xs bg-rose-500 hover:bg-rose-600 text-white rounded-md"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="py-1 px-2 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-md cursor-wait"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TaskList;
