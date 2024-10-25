import { Router } from 'express';
import * as controllers from '../controllers/task.controller.js';

const taskRoutes = Router();

taskRoutes.post('/', controllers.createTaskHandler);

export default taskRoutes;
