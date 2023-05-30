import { Router } from 'express';
import { createDelivery, getDelivery, getDeliveriesBulk, patchDelivery } from './delivery.controller';
import { verifyToken } from '../jwt.middleware';

const router = Router();

router.post('/', verifyToken, createDelivery);
router.get('/', verifyToken, getDelivery);
router.get('/bulk', verifyToken, getDeliveriesBulk);
router.patch('/', verifyToken, patchDelivery);

export default router; 