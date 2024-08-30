import express from 'express';
const router = express.Router();

import { login, saveUsuario } from "../controllers/login-controller.js";

router.post('/saveUsuario', saveUsuario);
router.post('/login', login);

export default router;