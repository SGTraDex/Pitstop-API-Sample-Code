import express, { Router } from 'express';

import dataRouter from '../data';
const router: Router = express.Router();

router.use('/', dataRouter);

export default router;