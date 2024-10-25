import TaskModel from '../models/task.model.js';

export const createTask = async (data, userId) => {
  // create task
  const newTask = await TaskModel.create({
    name: data.name,
    ...(data.description && { description: data.description }),
    ...(data.icon && { icon: data.icon }),
    status: data.status,
    userId,
  });

  return newTask;
};
