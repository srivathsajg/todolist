export type Priority = 'normal' | 'urgent' | 'important';
export type Category = 'Work' | 'Personal' | 'Study' | 'Design' | 'Health';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string
  priority: Priority;
  category: Category;
  completed: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
