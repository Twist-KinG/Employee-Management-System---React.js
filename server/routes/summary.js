import express from 'express'
import { getAdminSummary } from '../controllers/summaryController.js';

const router = express.Router();

router.get('/summary', getAdminSummary);

export default router;
