import { login, register } from '../controllers/auth.controller';
import * as express from 'express';
const router = express.Router()

router.post('/login', login);
router.post('/register', register);

export default router