import { Router } from 'express';
import * as controllers from '../controllers/task.controller.js';
import authenticate from '../middlewares/authenticate.js';

const taskRoutes = Router();

taskRoutes.post('/', authenticate, controllers.createTaskHandler);

export default taskRoutes;
