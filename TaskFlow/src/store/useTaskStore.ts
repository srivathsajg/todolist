import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'UI UX Designer',
    description: 'Review the latest designs',
    dueDate: new Date().toISOString(),
    priority: 'normal',
    category: 'Design',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Mobile App Designer',
    description: 'Sync up on the mobile components',
    dueDate: new Date().toISOString(),
    priority: 'urgent',
    category: 'Work',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Landing Page Design',
    description: 'Finalize hero section',
    dueDate: new Date().toISOString(),
    priority: 'important',
    category: 'Design',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Web Designer',
    description: 'Review web mockups',
    dueDate: new Date().toISOString(),
    priority: 'normal',
    category: 'Design',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Meeting with Client',
    description: 'Discuss Q3 goals',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    priority: 'important',
    category: 'Work',
    completed: false,
    createdAt: new Date().toISOString(),
  }
];

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: dummyTasks,
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, {
          ...task,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date().toISOString()
        }]
      })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
      toggleTaskCompletion: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
    }),
    {
      name: 'taskflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
