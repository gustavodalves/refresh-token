import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth';
import { AuthenticateController } from '../useCases/Auth/Authenticate/AuthenticateController';
import { LogoutController } from '../useCases/Auth/Logout/LogoutController';
import { MeController } from '../useCases/Auth/Me/MeController';
import { RefreshTokenController } from '../useCases/Auth/RefreshToken/RefreshTokenController';
import { CreateUser } from '../useCases/User/CreateUser';
import { GetAllUsers } from '../useCases/User/GetAllUsers';
import { GetUserById } from '../useCases/User/GetUserById';

export const router = Router();

router.post('/authenticate', AuthenticateController.handle)
router.post('/user/register', CreateUser.execute)

router.use(AuthMiddleware.execute)
router.get('/user', GetAllUsers.execute)
router.get('/me', MeController.handle)
router.get('/user/:id', GetUserById.execute)
router.post('/refresh_token', RefreshTokenController.handle)
router.post('/logout', LogoutController.handle)