import { Router } from 'express';
import * as controllers from '../controllers/task.controller.js';
import authenticate from '../middlewares/authenticate.js';

const taskRoutes = Router();

// Edit authenticate on routes after testing
taskRoutes.post('/', authenticate, controllers.createTaskHandler);
taskRoutes.get('/', authenticate, controllers.getUserTasksHandler);
taskRoutes.put('/:id', controllers.updateTaskHandler);
taskRoutes.delete('/:id', controllers.deleteTaskHandler);

export default taskRoutes;
