import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth';
import { AuthenticateController } from '../useCases/Auth/Authenticate/AuthenticateController';
import { LogoutController } from '../useCases/Auth/Logout/LogoutController';
import { MeController } from '../useCases/Auth/Me/MeController';
import { RefreshTokenController } from '../useCases/Auth/RefreshToken/RefreshTokenController';
import { CreateUserController } from '../useCases/User/CreateUser/CreateUserController';
import { GetAllUsersController } from '../useCases/User/GetAllUsers/GetAllUsersController';
import { GetUserByIdController } from '../useCases/User/GetUserById/GetUserByIdController';

export const router = Router();

router.post('/authenticate', AuthenticateController.handle)
router.post('/user/register', CreateUserController.handle)

router.use(AuthMiddleware.execute)
router.get('/user', GetAllUsersController.handle)
router.get('/me', MeController.handle)
router.get('/user/:id', GetUserByIdController.handle)
router.post('/refresh_token', RefreshTokenController.handle)
router.post('/logout', LogoutController.handle)