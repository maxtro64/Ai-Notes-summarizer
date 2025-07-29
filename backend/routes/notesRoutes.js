import express from 'express';
import { protect } from '../middleware/auth.js';
import { summarizeText } from '../controllers/notesController.js';

const router = express.Router();

// Protected routes
router.post('/summarize', protect, summarizeText);

export default router;