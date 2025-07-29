import Note from '../models/Notes.js';
import { generateSummary } from '../services/geminiService.js';

export const summarizeText = async (req, res) => {
  try {
    const { text, complexity = 'medium', style = 'default', tone = 'neutral' } = req.body;
    const userId = req.user.id;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Text must be a string with at least 15 characters'
      });
    }

    const summary = await generateSummary(text, { complexity, style, tone });

    const note = await Note.create({
      user: userId,
      originalText: text,
      summary,
      complexity,
      style,
      tone
    });

    res.status(200).json({
      success: true,
      data: {
        summary: note.summary,
        complexity: note.complexity,
        style: note.style,
        tone: note.tone,
        createdAt: note.createdAt
      }
    });

  } catch (error) {
    console.error('Summarization error:', error);
    
    if (error.message.includes('content safety')) {
      return res.status(400).json({
        success: false,
        error: 'Content violates safety policies. Please try different text.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate summary'
    });
  }
};