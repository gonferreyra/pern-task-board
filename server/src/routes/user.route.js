import { Router } from 'express';
import * as controllers from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.get('/', controllers.getUserHandler);

export default userRoutes;
