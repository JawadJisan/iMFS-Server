import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:email', UserController.getSingleUser);
router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.updateUser);

export const UserRoutes = router;
