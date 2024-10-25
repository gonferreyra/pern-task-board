import { z } from 'zod';
import * as services from '../services/task.service.js';

const createTaskSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  icon: z
    .enum(['coding', 'coffee', 'workout', 'study', 'chat', 'alarm'])
    .optional(),
  status: z.enum(['to-do', 'in-progress', 'completed', 'wont-do']).optional(),
});

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
