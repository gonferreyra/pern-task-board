import { z } from 'zod';
import * as services from '../services/task.service.js';
import TaskModel from '../models/task.model.js';

const createTaskSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  icon: z
    .enum(['coding', 'coffee', 'workout', 'study', 'chat', 'alarm'])
    .optional(),
  status: z.enum(['to-do', 'in-progress', 'completed', 'wont-do']).optional(),
});

const updateTaskSchema = createTaskSchema;

export const createTaskHandler = async (req, res, next) => {
  try {
    // validate request
    const userId = req.userId;
    const request = createTaskSchema.parse(req.body);

    // call service
    await services.createTask(request, userId);

    // response
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUserTasksHandler = async (req, res, next) => {
  try {
    // validate request
    const tasks = await TaskModel.findAll({
      where: {
        userId: req.userId,
      },
    });

    // response
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const updateTaskHandler = async (req, res, next) => {
  try {
    // validate request
    const taskId = req.params.id;
    const request = updateTaskSchema.parse(req.body);

    // call service
    const updatedTask = await services.updateTask(request, taskId);

    // response
    res
      .status(200)
      .json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    next(error);
  }
};
