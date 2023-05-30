import { Router } from 'express';
import { createUser, getUser, loginUser, patchUser, deleteUser } from './user.controller';
import { verifyToken } from '../jwt.middleware';

const router = Router();

router.post('/register', createUser);
router.get('/login', loginUser);
router.get('/', getUser);
router.patch('/', verifyToken, patchUser);
router.delete('/', verifyToken, deleteUser)

export default router; 