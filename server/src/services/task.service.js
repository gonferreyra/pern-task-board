import { where } from 'sequelize';
import { CustomError } from '../helpers/customError.js';
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

export const updateTask = async (data, taskId) => {
  const taskToUpdate = await TaskModel.findByPk(taskId);

  if (!taskToUpdate) {
    throw new CustomError('Task not found', 404);
  }

  const updatedTask = await taskToUpdate.update(data);

  return updatedTask;
};
