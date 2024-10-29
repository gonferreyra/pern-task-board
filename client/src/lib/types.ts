export type Icon = {
  id: number;
  emoji: string;
  value: string;
};

export type Session = {
  id: number;
  userAgent: string;
  createdAt: Date;
  isCurrentSession: boolean;
};
