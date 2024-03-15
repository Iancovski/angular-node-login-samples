import express from 'express';
import AuthController from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.get('/', AuthController.authenticate);
router.get('/logout', AuthController.logout);

export default router;
