import { Router } from 'express';
import { createProduct, getProduct, getUserProducts, searchProduct, patchProduct, deleteProduct } from './product.controller';
import { verifyToken } from '../jwt.middleware';

const router = Router();

router.post('/', verifyToken, createProduct);
router.get('/', getProduct);
router.get('/search', searchProduct);
router.get('/user', verifyToken, getUserProducts);
router.patch('/', verifyToken, patchProduct);
router.delete('/', verifyToken, deleteProduct);

export default router; 