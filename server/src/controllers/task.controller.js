import { z } from 'zod';
import * as services from '../services/task.service.js';
import TaskModel from '../models/task.model.js';
import { CustomError } from '../helpers/customError.js';

const createTaskSchema = z.object({
  name: z
    .string({
      required_error: 'Task name is required',
      invalid_type_error: 'Task name must be a string',
    })
    .min(5, { message: 'Task name must be at least 5 character long' })
    .max(100),
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

    if (!tasks || tasks.length < 1) {
      res.status(200).json({ tasks: [] });
    }

    // response
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const updateTaskHandler = async (req, res, next) => {
  try {
    // validate request
    const taskId = z.string().parse(req.params.id);
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

export const deleteTaskHandler = async (req, res, next) => {
  try {
    // validate request
    const taskId = z.string().parse(req.params.id);

    const taskToDelete = await TaskModel.findByPk(taskId);
    if (!taskToDelete) {
      throw new CustomError('Task not found', 404);
    }

    await taskToDelete.destroy();

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
