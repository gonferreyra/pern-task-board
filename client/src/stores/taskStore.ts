import { create } from 'zustand';
import { Task as TaskType } from '../lib/types';

type TaskStoreState = {
  taskModal: boolean;
  newTask: boolean;
  editTask: any;
  settingsMenu: boolean;
  handleNewTask: () => void;
  handleCloseModal: () => void;
  handleEditTask: (id: number, data: any) => void;
  handleSettingsMenu: (value: boolean) => void;
};

const useTaskStore = create<TaskStoreState>()((set) => ({
  taskModal: false,
  newTask: false,
  editTask: null,
  settingsMenu: false,
  handleNewTask: () => {
    set({
      taskModal: true,
      newTask: true,
    });
  },
  handleCloseModal: () => {
    set({
      taskModal: false,
      newTask: false,
    });
  },
  handleEditTask: (id: number, data: any) => {
    const task = data?.tasks.find((task: TaskType) => task.id === id);
    set({
      taskModal: true,
      editTask: task,
    });
  },
  handleSettingsMenu: (value) => {
    set({
      settingsMenu: value,
    });
  },
}));

export default useTaskStore;
