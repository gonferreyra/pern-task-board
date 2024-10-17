import { Router } from 'express';
import * as controllers from '../controllers/session.controller.js';
import authenticate from '../middlewares/authenticate.js';

const sessionRoutes = Router();

sessionRoutes.get('/', authenticate, controllers.getSessionHandler);

export default sessionRoutes;
