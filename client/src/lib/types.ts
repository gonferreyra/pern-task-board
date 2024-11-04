export type Icon = {
  // id: number;
  emoji: string;
  value: string;
};

export type Session = {
  id: number;
  userAgent: string;
  createdAt: Date;
  isCurrentSession: boolean;
};

export type Task = {
  id: number;
  name: string;
  description?: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'wont-do' | 'to-do';
};
