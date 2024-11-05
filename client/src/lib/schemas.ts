import { z } from 'zod';

export const createTaskSchema = z.object({
  name: z
    .string({
      required_error: 'Task name is required',
      invalid_type_error: 'Task name must be a string',
    })
    .min(1, { message: 'Task name must be at least 1 character long' })
    .max(100),
  description: z.string().optional(),
  icon: z.enum(['coding', 'coffee', 'workout', 'study', 'chat', 'alarm']),
  status: z.enum(['to-do', 'in-progress', 'completed', 'wont-do']),
});

export const updateTaskSchema = createTaskSchema;
