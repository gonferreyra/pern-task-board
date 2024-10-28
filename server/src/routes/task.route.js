import { Router } from 'express';
import * as controllers from '../controllers/task.controller.js';

const taskRoutes = Router();

// Edit authenticate on routes after testing
taskRoutes.post('/', controllers.createTaskHandler);
taskRoutes.get('/', controllers.getUserTasksHandler);
taskRoutes.put('/:id', controllers.updateTaskHandler);
taskRoutes.delete('/:id', controllers.deleteTaskHandler);

export default taskRoutes;
