import { Router } from 'express';
import UserRoutes from './user-routes';
import AuthenticationRoutes from './authentication-routes';

const router = Router();

AuthenticationRoutes(router);
UserRoutes(router);

export { router };